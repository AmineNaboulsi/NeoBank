import { useState } from "react"
import {useAppDispatch} from '../../Redux/hooks'
import {accountypevalidation} from '../../Redux/Slices/AccountSlice'
function StepDiposeit() {
    const [PickType , setPickType] = useState(1);
    const Dispatch = useAppDispatch();
  return (
    <div className="p-3.5">
       <ul className="flex flex-col w-full gap-6 md:grid-cols-2">
          <li>
              <label onClick={()=> {
                setPickType(1)
                Dispatch(accountypevalidation({numberpicker : 1}))
              }} className={`inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 ${PickType==1 ? 'border-blue-400': "border-gray-200"} rounded-lg cursor-pointer hover:shadow-md transition-all  `}>                           
                  <div className="block">
                      <div className="w-full text-lg font-semibold">Business Account </div>
                      <div className="w-full">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </div>
                  </div>
                  <svg className={`${PickType==1 ? 'border-blue-400': "border-gray-200"} w-5 h-5 ms-3 rtl:rotate-180`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </label>
          </li>
          <li>
              <label onClick={()=> {
                setPickType(2)
                Dispatch(accountypevalidation({numberpicker : 2}))
              }} className={`inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 ${PickType==2 ? 'border-blue-400': "border-gray-200"} rounded-lg cursor-pointer hover:shadow-md transition-all  `}>                           
                  <div className="block">
                      <div className="w-full text-lg font-semibold">Current Account </div>
                      <div className="w-full">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </div>
                  </div>
                  <svg className={`${PickType==2 ? 'border-blue-400': "border-gray-200"} w-5 h-5 ms-3 rtl:rotate-180`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </label>
          </li>
          <li>
              <label onClick={()=> {setPickType(3)
                Dispatch(accountypevalidation({numberpicker : 3}))
              }} className={`inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 ${PickType==3    ? 'border-blue-400': "border-gray-200"} rounded-lg cursor-pointer hover:shadow-md transition-all  `}>                           
                  <div className="block">
                      <div className="w-full text-lg font-semibold">Saving Account </div>
                      <div className="w-full">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </div>
                  </div>
                  <svg className={`${PickType==3 ? 'border-blue-400': "border-gray-200"} w-5 h-5 ms-3 rtl:rotate-180`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </label>
          </li>
      </ul>
    </div>
  )
}

export default StepDiposeit