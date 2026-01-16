'use server';

export interface PixData {
    hash: string;
    pix: {
        pix_qr_code: string;
        expiration_date: string;
    };
    amount_paid: number;
}

interface ParadiseErrorResponse {
    error?: string;
    message?: string;
    errors?: Record<string, string[]>;
}

// From user's PHP file
const API_TOKEN = 'sk_a689a20c480aee9372486cfc6ed7c349ecd7951ce3129f0236adff9a31ee42c7';
const PRODUCT_HASH = 'prod_27986c9bbe252ec6';
const PRODUCT_TITLE = 'RaspaGreen';

export async function generatePix(amount: number, user: { name: string; email: string }): Promise<PixData> {
    const api_url = 'https://multi.paradisepags.com/api/v1/transaction.php';

    // Amount should be in cents
    const amountInCents = Math.round(amount * 100);

    const payload = {
        "amount": amountInCents,
        "description": PRODUCT_TITLE,
        "productHash": PRODUCT_HASH,
        "customer": {
            'name': user.name || 'Usuário Anônimo',
            'email': user.email || 'na@na.com',
        }
    };

    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-Key': API_TOKEN
            },
            body: JSON.stringify(payload)
        });

        const result: PixData | ParadiseErrorResponse = await response.json();

        if (!response.ok) {
            let errorMessage = 'Ocorreu um erro ao gerar o PIX.';
            if ('errors' in result && result.errors) {
                errorMessage = Object.values(result.errors).flat().join(' ');
            } else if ('message' in result && result.message) {
                errorMessage = result.message;
            } else if ('error' in result && result.error) {
                errorMessage = result.error;
            }
            throw new Error(errorMessage);
        }
        
        if ('pix' in result && result.pix) {
            return result as PixData;
        } else {
             throw new Error('Resposta da API de pagamento inválida.');
        }

    } catch (error: any) {
        console.error('generatePix Error:', error);
        throw new Error(error.message || 'Falha na comunicação com o serviço de pagamento.');
    }
}

interface StatusResponse {
    payment_status?: 'paid' | 'pending' | 'failed';
    upsell_url?: string;
}

export async function checkPixStatus(transactionId: string): Promise<StatusResponse> {
    if (!transactionId) {
        throw new Error('ID da transação é inválido.');
    }
    
    const url = `https://multi.paradisepags.com/api/v1/check_status.php?hash=${transactionId}&_=${new Date().getTime()}`;

    try {
         const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-Key': API_TOKEN
            },
            cache: 'no-store'
        });
        
        if (!response.ok) {
            throw new Error('Falha ao verificar status do pagamento.');
        }

        const data: StatusResponse = await response.json();
        return data;

    } catch(error: any) {
        console.error('checkPixStatus Error:', error);
        throw new Error(error.message || 'Falha na comunicação com o serviço de pagamento.');
    }
}
