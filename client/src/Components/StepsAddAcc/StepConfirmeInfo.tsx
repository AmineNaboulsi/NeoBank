import {useAppSelector} from '../../Redux/hooks'
import {RootState} from '../../Redux/store'
function StepAccType() {
  const AccountInfo = useAppSelector((state: RootState)=>state.Account)
  
  return (
    <div className="m-3.5 border border-gray-500 rounded-md">
        <div className=''>
          <div className="bg-gray-400 rounded-t-md py-2 px-1">
              <span className='font-semibold text-gray-100'>Confirme Information Provide : </span>
          </div>
          <div className="flex flex-col gap-1 px-1 py-3">
                <span>
                  Owner : {AccountInfo.Owner}
                </span>
                <span>
                  Email : {AccountInfo.email}
                </span>
                <span>
                  Account Type : {AccountInfo.type == 1 ? 'Business Account' :
                  AccountInfo.type == 2 ? 'Current Account': 'Saving Account' }
                </span>
            </div>
          </div>
    </div>
  )
}

export default StepAccType