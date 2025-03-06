import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            await login(data.email, data.password);
            navigate("/pages/PageDashboard"); 
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-[url('src/assets/img/background.jpg')] bg-cover bg-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6 ">Iniciar Sesi�n</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo Electr�nico</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "El email es obligatorio" })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contrase�a</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "La contrase�a es obligatoria" })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full py-2 px-4 text-white cursor-pointer rounded-md bg-[var(--color-brown-middle)] hover:bg-[var(--color-brown-dark)]">
                        Ingresar
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        �No tienes una cuenta?{" "}
                        <Link to="/pages/register" className="text-indigo-500 hover:text-indigo-700">Registrarse</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
