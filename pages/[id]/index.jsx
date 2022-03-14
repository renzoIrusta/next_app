import dbConnect from "../../lib/dbConnect";
import Movie from "../../models/Movie";
import Link from "next/link";
import { useRouter } from "next/router";


const MoviePage = ({ success, error, movie }) => {

    const router = useRouter();

    const deleteData = async (id) => {
        try {
            await fetch(`/api/movie/${id}`, {
                method: "DELETE"
            });
            router.push("/");
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    if(!success){
        return (   
            <div className="container text-center my-5">
                <h1>{error}</h1>
                <Link href='/'>
                    <a className='btn btn-primary w-100'>Go back</a>
                </Link>
            </div>
        )
    }

  return (
    <div className="container">
        <h1>Detalle de movie</h1>
        <div className="card mb-2">
            <div className="card-body">
                <div className="h5 text-uppercase my-2">{movie.title}</div>
                <div className="text-muted my-2">{movie.plot}</div>

                <Link href="/">
                    <a className="btn btn-warning w-25 mx-2">Volver</a>
                </Link>

                <Link href={`${movie._id}/edit`}>
                    <a className="btn btn-primary w-25 mx-2">Editar</a>
                </Link>
                
                <button className="btn btn-danger w-25" onClick={() => deleteData(movie._id)}>Eliminar</button>
        </div>
        </div>
    </div>
  )
}

export default MoviePage

export async function getServerSideProps({ params }){
    try{
        await dbConnect();

        const movie = await Movie.findById(params.id).lean()
        
        if(!movie){
            return {
                props: {
                    success: false,
                    error: "Movie not found"
                }
            }
        }

        // console.log(movie);
        movie._id = movie._id.toString()
        return {
            props: {
                success: true,
                movie
            }
        }
    }catch(error){
        // console.log(error);
        if(error.kind === "ObjectId"){
            return {
                props: {
                    success: false,
                    error: "Id no valido"
                }
            }
        }
      return {
        props: {
            success: false,
            error: "Error en el servidor"
        }
    }
  }
}