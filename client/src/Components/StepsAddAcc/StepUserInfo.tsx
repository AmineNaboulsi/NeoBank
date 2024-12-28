import { FaAddressBook } from "react-icons/fa";
import { userinfovalidation  } from '../../Redux/Slices/AccountSlice'
import {useAppDispatch} from '../../Redux/hooks'
function StepUserInfo() {
    const Dispatch = useAppDispatch();
  return (
    <>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="flex items-center">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-200 sm:mx-0 sm:size-10">
                                        <FaAddressBook />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">New Account</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input type="text"
                                        onChange={(e)=>{
                                            Dispatch(userinfovalidation({owner : e.target.value}))
                                        }}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=' ' />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner Name</label>
                                    </div>
                                    <div  className="relative z-0 w-full mb-5 group">
                                        <input 
                                        type="email"
                                        onChange={(e)=>{
                                            Dispatch(userinfovalidation({email : e.target.value}))
                                        }}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=' ' />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                    </div>
        </div>
    </>
  )
}

export default StepUserInfo