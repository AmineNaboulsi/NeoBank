import StepUserInfo from './StepsAddAcc/StepUserInfo'
import StepDiposeit from './StepsAddAcc/StepAccType'
import StepAccType from './StepsAddAcc/StepConfirmeInfo'
import { useState } from 'react'
import {useAppSelector} from '../Redux/hooks'
type Cancel = {
    CancelAdding: () => void 
  }
type validation ={
    status : boolean | null ,
    message : string ,
}
function PopPupAddccount({CancelAdding }:Cancel) {
    const [steps , setsteps] = useState(1);
    const [loadingProcessCreation , setloadingProcessCreation] = useState(false);
    const Accountinfo = useAppSelector(state => state.accountinfo)

    const [creationvalidation, setcreationvalidation] = useState<validation>({
            status : null ,
            message : '' ,
        });

    const HandleAddAccount = () =>{
        if(steps >=3) {
            setloadingProcessCreation(true);
            let routeaction="";
            const Accountpara = new FormData();
            Accountpara.append('libelle',Accountinfo.Owner);
            Accountpara.append('email',Accountinfo.email);
            if(Accountinfo.Owner =='' || Accountinfo.email == ''){
                setcreationvalidation((prev)=>({
                    ...prev ,
                    status : false ,
                    message : 'Owner Name and Email required',
                }));
                setloadingProcessCreation(false);
                return ;
            }
            if(Accountinfo.type == 1) {
                routeaction="addbusinessaccount";
                Accountpara.append('fee','1')
            };
            if(Accountinfo.type == 2) {
                routeaction="addcurrentaccount"
                Accountpara.append('limitR','1')
            };;
            if(Accountinfo.type == 3) {
                routeaction="addsavingaccount"
                Accountpara.append('Minimum_Solde','50')
                Accountpara.append('Interest_Rate','1')
            };;
            fetch(`${import.meta.env.VITE_APP_URL}/${routeaction}?from=1&to=7`,{
                method : 'POST',
                body : Accountpara
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setcreationvalidation((prev)=>({
                    ...prev ,
                    status : data?.status ,
                    message : data?.message ,
                }))
                setloadingProcessCreation(false);
                if(data?.status) CancelAdding()
            })

        }
    }
  return (
    <div className="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
                
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="px-5 pb-1 pt-5">
                                <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                                                <li className="flex items-center  text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
                                                    <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                                                        1
                                                    </span>
                                                    <span>
                                                        <h3 className="font-medium leading-tight">User info</h3>
                                                        <p className="text-xs">Step info here</p>
                                                    </span>
                                                </li>
                                                <li className={`flex gap-2 items-center pace-x-2.5 rtl:space-x-reverse ${steps>=2 ? "text-blue-600" : "text-gray-500"}`}>
                                                    <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                                        2
                                                    </span>
                                                    <span>
                                                        <h3 className="font-medium leading-tight">Account type</h3>
                                                        <p className="text-xs">Step type here</p>
                                                    </span>
                                                </li>
                                                <li className={`flex gap-2 items-center pace-x-2.5 rtl:space-x-reverse ${steps>=3 ? "text-blue-600" : "text-gray-500"}`}>
                                                    <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                                        3
                                                    </span>
                                                    <span>
                                                        <h3 className="font-medium leading-tight">Confirm info</h3>
                                                        <p className="text-xs">Confirm here</p>
                                                    </span>
                                                </li>
                                </ol>
                            </div>
                            {steps==1 && <StepUserInfo  />}
                            {steps==2 && <StepDiposeit  />}
                            {steps==3 && <StepAccType  />}
                        {(loadingProcessCreation || creationvalidation.status != null ) && (
                        <div className={`mx-6 flex gap-2 items-center p-4 mb-4 text-sm text-gray-300 border ${creationvalidation.status==null ? 'border-blue-500':!creationvalidation.status ? 'border-red-500':'border-green-500' } rounded-lg bg-blue-50`} role="alert">
                                    {creationvalidation.status==null ?(
                                        <svg aria-hidden="true" className="inline w-4 h-4 text-gray-400 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    ): (creationvalidation.status) ? (
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
                                        <span className={`${creationvalidation.status==null ? 'text-blue-600' :creationvalidation.status ? 'text-green-600 ': 'text-red-600'} font-medium`}>{creationvalidation?.message!='' ? creationvalidation?.message : 'In Progress' }</span>
                                    </div>
                                </div> 
                                )}
                 
                            <div className="px-4 py-3 bg-gray-50 flex justify-between">
                                <button onClick={CancelAdding} type="button"  className="inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:text-white hover:bg-gray-500 sm:ml-3 sm:w-auto">Cancel</button>
                                <button onClick={()=>{
                                    if(steps <= 2)
                                        setsteps(steps+1)

                                }} type="button"  className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto">
                                    {loadingProcessCreation && (
                                         <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-white fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                     </svg>
                                    )}
                                    <span onClick={HandleAddAccount}>{steps >=3 ?"Confirm":"Next"}</span>
                                </button>
                            </div>
                </div>
                
                </div>
                
            </div>

        </div>
  )
}

export default PopPupAddccount