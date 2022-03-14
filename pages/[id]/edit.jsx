import Form from "../../components/Form";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error( 'An error occurred while fetching the data' );
        error.info = await res.json();
        error.status = res.status;
        throw error; 
    }

    const {data} = await res.json();
    return data;
};

export default function EditMovie() {
    
    const router = useRouter();
    
    const { id } = router.query;

    
    const { data: movie, error } = useSWR(id ? `/api/movie/${id}`: null, fetcher);
    
    if (error) return <div>Failed to load</div>;
    

    if (!movie) {
        return (
          <div className="container mt-5 text-center">
            <h1>Loading...</h1>
          </div>
        );
      }
    
      const formData = {
        title: movie.title,
        plot: movie.plot
    };

  return (
    <div className="container">
      <h1>Editar</h1>
      <Form
        formData={formData}
        forNewMovie={false}
      >
      </Form>
    </div>
  )
}
