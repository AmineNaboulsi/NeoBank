import { useEffect, useState } from "react"
import Header from "../Components/Header"
import PopPupFreezAcc from "../Components/PopPupFreezAcc"
import PopPupAddccount from "../Components/PopPupAddccount"
import PopPupTransaction from "../Components/PopPupTransaction"
import OpenAddDepoPanel from "../Components/PopPupDeposit"
import { PiHandDeposit } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";

type Account =  {
   "type": string,
   "Numero": number,
   "Owner": string,
   "Solde": string
}

function Accounts() {

    const [accounts , setaccounts] = useState<Account[]>();
    const [accountsIdSelected , setaccountsIdSelected] = useState(-1);
    const [OpenFrezzAccount , setOpenFrezzAccount] = useState(false);
    const [OpenAddAccount , setOpenAddAccount] = useState(false);
    const [OpenAddTransaction , setOpenTransaction] = useState(false);
    const [OpenAddDepo , setOpenDepo] = useState(false);

    const HandledClickFrezz = (Id:number) =>{
        setaccountsIdSelected(Id);
        setOpenFrezzAccount(true);
    }
    const handleClose = () => {
        setOpenFrezzAccount(false);
        setaccountsIdSelected(-1);
        setOpenAddAccount(false);
        setOpenTransaction(false);
        setOpenDepo(false);
        
      };
    const handleAddingBtnPanel = () => {
        setOpenAddAccount(false);
    };

    useEffect(()=>{
        const getdataAccounts = () => {
            fetch(`${import.meta.env.VITE_APP_URL}/getAccounts?from=1&to=7`)
            .then(res=>res.json())
            .then(data=>{
                setaccounts(data?.accounts)
            })
        }
        getdataAccounts();
    },[]);
  return (
    <>
     <Header />
     
     {OpenFrezzAccount && (
        <PopPupFreezAcc 
        ReadyTOPopUP={OpenFrezzAccount}
        AccountId={accountsIdSelected} 
        ClosePop={handleClose}/>
     )}
     {OpenAddAccount && (
        <PopPupAddccount
            CancelAdding={handleAddingBtnPanel}
        />
     )}
      {OpenAddTransaction && (
        <PopPupTransaction
            ClosePop={handleClose}
         />
      )}
      {OpenAddDepo && 
      (
        <OpenAddDepoPanel  
            ClosePop={handleClose}
        />
      )}
     <div className="mx-24 my-5 grid grid-rows-[auto,1fr] gap-6 items-center max-w-screen-xl">
     <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Accounts</h1>
        <div className="flex items-center gap-5">
            <div 
                    onClick={()=>{
                        setOpenTransaction(true);
                }}
         className="flex items-center gap-3 cursor-pointer shadow hover:shadow-sm hover:shadow-green-500 bg-green-500 text-white px-3 py-1 rounded-md">
                <GrTransaction />
                <span>Transaction</span>
            </div>
            <div onClick={()=>{
                setOpenDepo(true);
            }} 
            className="flex items-center gap-3 cursor-pointer shadow hover:shadow-sm hover:shadow-blue-500 bg-blue-500 text-white px-3 py-1 rounded-md">
                <PiHandDeposit />
                <span>Deposit</span>
            </div>
            <div  className="flex items-center gap-3 cursor-pointer shadow hover:shadow-sm hover:shadow-red-500 bg-red-500 text-white px-3 py-1 rounded-md">
                <PiHandDeposit />
                <span>Retirer</span>
            </div>
            <div onClick={()=> {
                setOpenAddAccount(true);
            }} className="flex items-center gap-3 cursor-pointer shadow hover:shadow-sm hover:shadow-black bg-black text-white px-3 py-1 rounded-md">
                <IoMdAdd />
                <span>New Account</span>
            </div>
            
        </div>
     </div>
     
        <div className="border-[1px] rounded-md grid grid-rows-[1fr,auto]">
            <div className="w-full">
                <div className="relative overflow-x-auto h-[70vh] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Owner
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Account Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Solde
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {accounts && accounts.map((item )=>(
                            <tr className=" text-black border-b ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                {item?.Owner}
                            </th>
                            <td className="px-6 py-4">
                                {item?.type}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-[1px] ">
                                    {item?.Solde}
                                    <IoIosArrowRoundUp 
                                        size={25}
                                        className={`${item?.Solde == "0" ? "text-red-600 rotate-[180deg]" : "text-green-500 rotate-[0deg]"}`} />
                                </div>
                                
                            </td>
                            <td className="px-6 py-4">
                                <span className="cursor-pointer underline text-red-400" onClick={() => HandledClickFrezz(item?.Numero)}>Frozen account</span>
                            </td>
                        </tr>
                        ))}
                        
                    
                    </tbody>
                </table>
                </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="flex gap-2">
                    <p className="text-sm flex gap-2  bg-gray-700 p-1 rounded text-white cursor-pointer">
                        All 
                    </p>
                    <p className="text-sm flex gap-2 text-gray-700 p-1 rounded cursor-not-allowed ">
                        Business 
                    </p>
                    <p className="text-sm flex gap-2 text-gray-700 p-1 rounded cursor-not-allowed ">
                        Current 
                    </p>
                    <p className="text-sm flex gap-2 text-gray-700 p-1 rounded cursor-not-allowed ">
                        Saving 
                    </p>
                </div>
                <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                    </svg>
                    </a>
                        <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-gray-700 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                        <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                    </a>
                </nav>
                </div>
            </div>
            </div>
        
        </div>
    </div>

    </>
  )
}

export default Accounts