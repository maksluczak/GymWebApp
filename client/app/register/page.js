export default function Register() {
    return (
      <section className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-purple-700 md:text-2xl">
                    Sign up your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-purple-700">Firstname</label>
                        <input type="firstname" name="firstname" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Kamil" required=""></input>
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-purple-700">Lastname</label>
                        <input type="lastname" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Gala" required=""></input>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-700">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="galson@gmail.com" required=""></input>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-700">Password</label>
                        <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="••••••••" required=""></input>
                    </div>
                    <button href="/login" type="submit" className="w-full text-white bg-purple-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <a href="/login" className="font-medium text-purple-700 hover:underline">Sign in</a>
                        </p>
                </form>
            </div>
        </div>
      </section>
    );
  }