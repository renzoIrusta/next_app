
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Form({ formData, forNewMovie = true }) {

    const router = useRouter();

    const [form, setForm] = useState({
        title: formData.title,
        plot: formData.plot
    });

    const [errors, setErrors] = useState([]);
    // Aquí quizás sea mejor usar message antes que errors

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (forNewMovie) {
            postData(form);
        }else{
            putData(form);
        }
    };

    const postData = async (form) => {
        try {
            const res = await fetch("/api/movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            // console.log(data);
            if (!data.success) {
                for (let key in data.err.errors) {
                    setErrors(oldMessages => [
                        ...oldMessages,
                        data.err.errors[key].message
                        ]);
                }
            } else{
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const putData = async (form) => {
        setErrors([]);
        const { id } = router.query;
        try {
            const res = await fetch(`/api/movie/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            // console.log(data);
            if (!data.success) {
                for (let key in data.err.errors) {
                    setErrors (oldMessages => [    
                        ...oldMessages,
                        data.err.errors[key].message
                        ]);
                }
            } else{
                setErrors(["Movie updated"]);
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <div className="form-group my-3">
                    <label htmlFor="title">Titulo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Titulo"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="plot">Descripcion</label>
                    <input
                        type="text"
                        className="form-control"
                        name="plot"
                        placeholder="Descripcion"
                        value={form.plot}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2 w-100">{forNewMovie ? 'Agregar' : 'Editar'}</button>
                <Link href="/">
                    <a className="btn btn-warning w-100">Volver</a>
                </Link>
                {
                    errors.map((err, i) => (
                        <p key={i} className="text-danger">{err}</p>
                    ))
                }
            </form>
        </div>
    )
}
