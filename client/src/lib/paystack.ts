import type { Book } from "@shared/schema";

interface PaystackPaymentOptions {
  email: string;
  amount: number; // in kobo (100 kobo = 1 naira)
  items: Book[];
  onSuccess: (reference: string) => void;
  onCancel: () => void;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

export async function initiatePaystackPayment(options: PaystackPaymentOptions): Promise<void> {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || "pk_test_your_paystack_public_key";
  
  // Load Paystack script if not already loaded
  if (!window.PaystackPop) {
    await loadPaystackScript();
  }

  const handler = window.PaystackPop.setup({
    key: publicKey,
    email: options.email,
    amount: options.amount,
    currency: 'NGN',
    ref: generateTransactionRef(),
    metadata: {
      custom_fields: [
        {
          display_name: "Items",
          variable_name: "items",
          value: options.items.map(item => `${item.title} by ${item.author}`).join(', ')
        }
      ]
    },
    callback: function(response: any) {
      // Payment successful
      recordPurchase(response.reference, options.email, options.items);
      options.onSuccess(response.reference);
    },
    onClose: function() {
      // Payment cancelled
      options.onCancel();
    }
  });

  handler.openIframe();
}

async function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
}

function generateTransactionRef(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function recordPurchase(reference: string, email: string, items: Book[]): Promise<void> {
  try {
    for (const item of items) {
      await fetch('/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          bookId: item.id,
          transactionRef: reference,
          amount: item.price
        })
      });
    }
  } catch (error) {
    console.error('Error recording purchase:', error);
  }
}
