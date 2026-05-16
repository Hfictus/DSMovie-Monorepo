
import { useParams } from 'react-router-dom';
import FormCard from '../../components/FormCard';

export default function Form() {
    
    const params = useParams();

    return (    
        <FormCard movieId={`${params.movieId}`} />
    )
    //movieId buscado por params: parte do path do filho <Form /> -> ver App.tsx 
}