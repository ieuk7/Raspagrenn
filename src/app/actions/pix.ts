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

// Added from user's PHP file to fix the missing document issue
const randomCpfs = ['42879052882', '07435993492', '93509642791', '73269352468', '35583648805', '59535423720', '77949412453', '13478710634', '09669560950', '03270618638'];
const randomDdds = ['11', '21', '31', '41', '51', '61', '71', '81', '85', '92', '27', '48'];


export async function generatePix(amount: number, user: { name: string; email: string; document?: string | null; phone?: string | null }): Promise<PixData> {
    const api_url = 'https://multi.paradisepags.com/api/v1/transaction.php';

    // Amount should be in cents
    const amountInCents = Math.round(amount * 100);

    // Use provided document or generate a random one if it's missing or empty
    const document = user.document || randomCpfs[Math.floor(Math.random() * randomCpfs.length)];

    // Use provided phone or generate a random one if it's missing or empty
    const phone = user.phone || (randomDdds[Math.floor(Math.random() * randomDdds.length)] + '9' + Math.floor(10000000 + Math.random() * 90000000).toString());


    const payload = {
        "amount": amountInCents,
        "description": PRODUCT_TITLE,
        "productHash": PRODUCT_HASH,
        "customer": {
            'name': user.name || 'Usuário Anônimo',
            'email': user.email || 'na@na.com',
            'document': document,
            'phone': phone,
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

        const result: any = await response.json();

        if (!response.ok) {
            let errorMessage = 'Ocorreu um erro ao gerar o PIX.';
            if (result.errors) {
                errorMessage = Object.values(result.errors).flat().join(' ');
            } else if (result.message) {
                errorMessage = result.message;
            } else if (result.error) {
                errorMessage = result.error;
            }
            throw new Error(errorMessage);
        }
        
        const transaction_data = result.transaction ?? result;

        if (transaction_data && transaction_data.qr_code) {
             const pixData: PixData = {
                hash: transaction_data.id,
                pix: {
                    pix_qr_code: transaction_data.qr_code,
                    expiration_date: transaction_data.expires_at,
                },
                amount_paid: amountInCents
            };
            return pixData;
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
