// import Sidebar from "@/components/sidebar";
import "./globals.css"; // Agar aapki css file hai

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
       
        <div>      
                     {/* <Sidebar /> */}
                
       <main className=" w-384"> 
        {children}
      </main>
      </div>

      </body>
    </html>
  );
}