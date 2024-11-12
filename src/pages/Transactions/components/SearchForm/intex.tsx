import { MagnifyingGlass } from "phosphor-react";
import { SearchFormConteiner } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export default function SearchForm() {

    const { fetchTransactions } = useContext(TransactionsContext)

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    })

    async function handleSearchTransactions(data: SearchFormInputs) {
        await fetchTransactions(data.query)
        console.log(data)
    }

    return(
        <SearchFormConteiner onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Buscar por transicoes"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormConteiner>
    );
} 