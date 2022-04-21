import { useEffect, useRef, useState } from "react";
import { FormHandles, SubmitHandler } from "@unform/core";
import * as Yup from 'yup';

import { getPostsHttp, postPostHttp, PostResponse } from "../../services/http/post";
import getHttpErrors, { WarningTuple } from "../../util/getHttpErrors";
import getValidationErrors from "../../util/getValidationErrors";

import { Button, CardText, Spinner } from "reactstrap";
import { Form } from "../../styles/components";
import InputField from "../../components/Input";
import Warning from "../../components/Warning";
import DataCard from "../../components/DataCard";

type AddPostFormData = {
    title: string;
    body: string;
    userId: number;
}

const PostPage = () => {
    const addPostFormRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState<"" | "add" | "list">("");
    const [warning, setWarning] = useState<WarningTuple>(["", ""]);
    const [posts, setPosts] = useState<PostResponse[]>([]);

    const getInitialValues = async () => {
        setIsLoading("list");

        await getPostsHttp()
            .then(response => {
                setPosts([...response]);
                setIsLoading("");
            });
    }

    useEffect(() => {
        getInitialValues();
    }, []);

    const submitAddPostForm: SubmitHandler<AddPostFormData> = async (data, { reset }) => {
        try {
            setIsLoading("add");
            addPostFormRef.current?.setErrors({});
            setWarning(["", ""]);

            const shema = Yup.object().shape({
                title: Yup.string()
                    .trim()
                    .required("Title is required."),
                body: Yup.string()
                    .trim()
                    .required("Body is required."),
                userId: Yup.string()
                    .trim()
                    .required("UserId is required."),
            });

            await shema.validate(data, {
                abortEarly: false
            });

            data.userId = Number(data.userId);

            postPostHttp(data)
                .then(() => {
                    reset();
                    setWarning(["success", "Post successfully added."]);
                })
                .catch(error => setWarning(getHttpErrors(error, "Unable to add post.")))
                .finally(() => setIsLoading(""));
        }
        catch (err) {
            if (err instanceof Yup.ValidationError)
                addPostFormRef.current?.setErrors(getValidationErrors(err));
            setIsLoading("");
        }
    }

    return (
        <>
            <h1>Post</h1>
            <h3>Add</h3>

            <Form
                ref={addPostFormRef}
                onSubmit={submitAddPostForm}
                initialData={{
                    title: "title",
                    body: "body",
                    userId: 1
                }}
            >
                <InputField
                    name='title'
                    label='Title'
                    placeholder='Put the title'
                />

                <InputField
                    name='body'
                    label='Body'
                    placeholder='Put the body'
                    type="textarea"
                />

                <InputField
                    name='userId'
                    label='User ID'
                    placeholder='Put the title User ID'
                />

                <Button
                    disabled={isLoading === "add"}
                >
                    {isLoading === "add"
                        ? <Spinner size="sm" />
                        : "Submit"
                    }
                </Button>

                <Warning value={warning} />
            </Form>

            <h3>List</h3>
            {isLoading === "list" && <Spinner />}

            {posts.map(pos => (
                <DataCard
                    key={pos.id}
                    title={pos.title}
                    children={(
                        <CardText>
                            {pos.body}
                        </CardText>
                    )}
                />
            ))}
        </>
    )
}

export default PostPage;