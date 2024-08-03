import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Şema tanımı
const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

const SimpleForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm < FormData > ({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('Form data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    {...register('email')}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default SimpleForm;
