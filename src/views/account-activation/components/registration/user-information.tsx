import React from 'react';
import { PageBody, PageActions, FormInput } from 'shared/components';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface Props {
    onSubmit: (data: { name: string, email: string }) => void
}

const UserInformation: React.FC<Props> =
    ({
        onSubmit
    }) => {
        const {
            register,
            errors,
            formState,
            handleSubmit
        } = useForm({
            mode: 'onBlur'
            // reValidateMode: 'onChange'
            // mode: 'onChange',
        });

        const submitForm = (formData: any) => {
            onSubmit({
                name: formData.name,
                email: formData.email
            });
        };

        return (<form onSubmit={handleSubmit(submitForm)}>
            <PageBody>
                <FormInput label="Nama Lengkap"
                    labelFor="name"
                    errorMessage={errors?.name?.message}>

                    <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        placeholder="contoh: Andika Putra"
                        maxLength={30}
                        isInvalid={formState.touched.name === true && !!errors.name}
                        ref={
                            register({
                                required: {
                                    value: true,
                                    message: 'Nama Lengkap harus diisi'
                                },
                                pattern: {
                                    // value: /^[a-zA-Z]+( [a-zA-Z]+)*$/,
                                    value: /^[a-zA-Z]+([a-zA-Z ])*$/,
                                    message: 'Nama Lengkap hanya boleh alfabet dan spasi'
                                }
                            }) as (string & ((ref: Element | null) => void))
                        } />

                </FormInput>

                <FormInput label="Alamat Email"
                    labelFor="email"
                    errorMessage={errors?.email?.message}>

                    <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        placeholder="contoh: andika@email.com"
                        maxLength={80}
                        isInvalid={formState.touched.email === true && !!errors.email}
                        ref={
                            register({
                                required: {
                                    value: true,
                                    message: 'Alamat Email harus diisi'
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Format Alamat Email salah'
                                }
                            }) as (string & ((ref: Element | null) => void))
                        } />

                </FormInput>
            </PageBody>
            <PageActions>
                <Button type="submit"
                    block={true}
                    variant="primary"
                // disabled={formState.isValid === false}
                >
                    LANJUT
                </Button>
            </PageActions>
        </form>);
    };

export default UserInformation;