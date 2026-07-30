function Signin(){
    return(
        <div className=" h-15 w-25 bg-blue-900 text-amber-200 flex justify-center items-center rounded-2xl ">
            Sign in </div>
    )
}

function Signup(){
    return(
        <div className=" h-15 w-25 bg-blue-900 text-amber-200 flex justify-center items-center rounded-2xl ">
            Sign in </div>
    )
}

function Navbar(){
    return(
    <nav className=" flex justify-evenly items-center bg-black h-20 w-screen">
        <Signin/>
        <Signup/>
    </nav>
    )
} 
export default Navbar