import LoginFrom from "../_components/LoginFrom"


const loginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">
              Please enter your details to sign in to your account.
            </p>
          </div>
          
        <LoginFrom />
      </div>

    </div>
  )
}

export default loginPage
