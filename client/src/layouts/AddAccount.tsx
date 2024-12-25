import Header from "../Components/Header"

function AddAccount() {
  return (
    <>
     <Header />
     <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    
    <form>
    <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
    </div>

</form>
    </div>
    </>
  )
}

export default AddAccount