import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID;
//const clientId ="AboxZQhejEWp6QmwxTjqZntWVT83Mu-Gj21tMD6--NI-jA7jfko0PCfERWP-v0y8mdQuSVtX6u0VyTlV"
  
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
//const clientSecret= "EOIvXOiXqq1SI4NGWmN1o8awQ3JKnpGSGo0zO89tV8oibB8PXr08ob7YUIUBtT_5dDAIB8l7Ap2DXhy9"

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
          breakdown:{
            item_total: {
              currency_code: "USD",
              value: "100.00",
            }
          }
        },        
      
        items:[
          {
            name: "Book of React",
            description: "A book about React",
            quantity: 1,
            unit_amount:{
              currency_code: "USD",
              value: "50.00",
            }
          },
          {
            name: "Book of Next",
            description: "A book about Next",
            quantity: 1,
            unit_amount:{
              currency_code: "USD",
              value: "50.00",
            }
          }
        ]
      },
    ],
  });

  const response = await client.execute(request);
  console.log(response);

  return NextResponse.json({
    id: response.result.id,
  });
}
