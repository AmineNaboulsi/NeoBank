import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
type Cancel = {
    ClosePop: () => void 
  }
function PopPupDeposit({ClosePop }:Cancel) {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
    
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        
        <div className="h-[45vh] grid grid-rows-[1fr,auto] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-2">
                    <span>Account</span>
                    <Select className='fixed ' options={options} />
                </div>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-2">
                    <span>Amount</span>
                    <input className='border-[1px] border-gray-300 px-2.5 py-1.5 rounded focus:border-blue-300 active:border-blue-300' type='number' placeholder='Amount' />
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
                    <span>Depose</span>
                </button>
                <button onClick={ClosePop}  type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
        </div>
        </div>
    </div>

</div>
  )
}

export default PopPupDeposit