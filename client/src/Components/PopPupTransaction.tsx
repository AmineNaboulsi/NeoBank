import Select from 'react-select'
import {useEffect, useState} from 'react'

interface typeOption {
        one : number,
        two : number,
        amount : number,
        isReadytoMakeTransaction : boolean ,
        status : boolean |null,
        message : string ,
}
interface typeAccount {
    "type": string,
    "Numero": number,
    "Owner": string,
    "Solde": number,
    "Active": boolean
}
type Cancel = {
    ClosePop : () => void
}
function PopPupTransaction({ClosePop }:Cancel) {
    const [accounts, setAccounts] = useState<{ value: string; label: string ,Numero: number }[]>([]);
    const [twoaccounts, setwoaccounts] = useState<typeOption>({
        one : -1,
        two : -1,
        amount : 0,
        isReadytoMakeTransaction : false ,
        status : null ,
        message : '' ,
    });

    useEffect(()=>{
            const getdataAccounts = async () => {
                const response = await fetch(`${import.meta.env.VITE_APP_URL}/getAccounts`);
                const data = await response.json();

                    if (data?.accounts) {
                    const formattedAccounts = data.accounts.map((element:typeAccount ) => ({
                        value: element?.Owner,
                        label: element?.Owner,
                        Numero: element?.Numero,
                    }));
                    setAccounts(formattedAccounts);
                    }
            }
            getdataAccounts();
        },[]);

        const customStyles = {
            menu: (provided: any) => ({
              ...provided,
              maxHeight: '100px', 
              overflowY: 'auto', 
            }),
          };
    const handleClickMakeTransaction = () =>{
        if(twoaccounts.one != -1 && twoaccounts.two != -1 &&  twoaccounts.amount > 0){
            setwoaccounts((prev)=>({
                ...prev ,
                isReadytoMakeTransaction : true,
            }))
            const formData = new URLSearchParams();
            formData.append('sender',''+twoaccounts.one);
            formData.append('to',""+twoaccounts.two);
            formData.append('amount',""+twoaccounts.amount);
            fetch(`${import.meta.env.VITE_APP_URL}/transaction?${formData}`,{
                method : 'PATCH'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setwoaccounts((prev)=>({
                    ...prev ,
                    isReadytoMakeTransaction : false,
                    status : data.status,
                    message : data.message,
                }))
            })
        }else{
            // lol mafiya lisawbha
        }
       
    }
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
    
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        
        <div className={`${(twoaccounts.isReadytoMakeTransaction || twoaccounts.status != null) ?'h-[60vh]':'h-[55vh]'} grid grid-rows-[1fr,auto] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}>
            <div className="flex flex-col pt-3 py">
               
                <div className="bg-white px-4 py-1 sm:px-6 flex flex-col gap-1">
                    <span>From</span>
                    <Select 
                     styles={customStyles}
                     onChange={(selectedOption: { value: string; label: string , Numero : number } | null)=>{
                        setwoaccounts((prev)=>({
                            ...prev ,
                            one : selectedOption ? selectedOption.Numero :-1
                        }))
                     }}
                    className='fixed ' options={accounts} />
                </div>
                <div className="bg-white px-4 py-1 sm:px-6 flex flex-col gap-1">
                    <span>To</span>
                    <Select className='fixed '
                    styles={customStyles}
                    onChange={(selectedOption: { value: string; label: string ; Numero: number } | null)=>{
                        setwoaccounts((prev)=>({
                            ...prev ,
                            two : selectedOption ? selectedOption.Numero :-1
                        }))
                        console.log(twoaccounts)
                     }}
                    options={accounts} />
                </div>
                <div className="bg-white px-4 pt-5 sm:p-6 flex flex-col gap-2">
                    <span>Amount</span>
                    <input
                    onChange={(e)=>{
                        setwoaccounts((prev)=>({
                            ...prev ,
                            amount : Number(e.target.value)
                        }));
                       
                    }} 
                    className='border-[1px] border-gray-300 px-2.5 py-1.5 rounded focus:border-blue-300 active:border-blue-300' type='number' placeholder='Amount' />
                </div>
                {(twoaccounts.isReadytoMakeTransaction || twoaccounts.status != null) && (
                  <div className={`mx-6 flex gap-2 items-center p-4 mb-4 text-sm text-gray-300 border ${twoaccounts.status ? 'bg-red-500':'bg-green-500' } rounded-lg bg-blue-50`} role="alert">
                       {twoaccounts.isReadytoMakeTransaction ?(
                        <svg aria-hidden="true" className="inline w-4 h-4 text-gray-400 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                       ): (twoaccounts.status) ? (
                        <>
                            <svg className="text-green-600 flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                        </>
                       ): (
                        <svg className="text-red-600 flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                       )}
                      
                       <div>
                           <span className={`${twoaccounts.status==null ? 'text-blue-600' :twoaccounts.status ? 'text-green-600 ': 'text-red-600'} font-medium`}>{twoaccounts?.message!='' ? twoaccounts?.message : 'In Progress' }</span>
                       </div>
                   </div> 
                )}
                
            </div>
            <div className={`${twoaccounts.status!=null && 'hidden'}  bg-gray-50 px-4 py-3 sm:flex justify-center gap-3 sm:px-6`}>
                <button onClick={ClosePop} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                <button onClick={handleClickMakeTransaction} type="button" className="inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">
                    <span>Make Transition</span>
                </button>
            </div>
        </div>
        </div>
    </div>

</div>
  )
}

export default PopPupTransaction