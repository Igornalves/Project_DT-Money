import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as z from 'zod';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export default function NewTransActionModal() {

    const { control ,register, handleSubmit, formState: { isSubmitted } } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log(data)
    }

    return(
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova transacao</Dialog.Title>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type='text' 
                        placeholder='Descricao' 
                        required
                        {...register('description')}
                    />
                    <input 
                        type='number' 
                        placeholder='Preco' 
                        required
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input 
                        type='text' 
                        placeholder='Categoria' 
                        required
                        {...register('category')}
                    />

                    <Controller 
                        control={control}
                        name='type'
                        render={({ field }) => {
                            // console.log(field)
                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24}/>
                                            Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                            Saida 
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type='submit' disabled={  isSubmitted }>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    );
}