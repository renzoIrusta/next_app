import Form from "../components/Form"

export default function New() {

    const formData = {
        title: "",
        plot: ""
    };

    return (
        <div className="container">
            <h1 className="my3">Agregar Movie</h1>
            <Form formData={formData}/>
        </div>
    )
}

