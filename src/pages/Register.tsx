import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    // Generar un ID �nico con la fecha y hora actual
    const uniqueID = `user-${Date.now()}`;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            user_id: uniqueID,
            email: data.email,
            name: data.name,
            password: data.password,
          }),
        }
      );

      if (response.status >= 300) {
        throw new Error("Error en el registro: " + response.statusText);
      }

      toast.success("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[url('/assets/img/background.jpg')] bg-cover bg-center min-h-screen px-4">
      <div className="py-7 bg-white p-6 md:p-10 rounded-lg shadow-lg w-11/12 max-w-md mt-20 lg:mt-10 mb-10">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Registrarse
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "El email no es v�lido",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "La confirmaci�n de contrase�a es obligatoria",
                validate: (value) =>
                  value === watch("password") || "Las contrase�as no coinciden",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 cursor-pointer bg-[var(--color-brown-middle)] hover:bg-[var(--color-brown-dark)] text-white rounded-md"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:text-indigo-700"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
