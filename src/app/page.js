"use client"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
//Ref: https://www.youtube.com/watch?v=ouqcQunk0fU  FAZTWEB
//https://www.sandbox.paypal.com/ comprueba pagos
function HomePage() {
//console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)

  return (
    <div className="h-screen bg-slate-950 flex justify-center items-center">
      <PayPalScriptProvider options={{        
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
      }}>
        <PayPalButtons
        style={{
          color: "blue",
          layout: "horizontal",
          label: "pay"
        }}
        createOrder={async() => {
          const res = await fetch('/api/checkout',{
          method: 'POST'
        })
        const order = await res.json()
        console.log(order)
        return order.id
      }}
      onApprove={(data, actions)=>{
        console.log(data)
        actions.order.capture()
      }}
      onCancel={(data)=>{
        console.log("Order Cancelled:",data)
      }}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default HomePage
