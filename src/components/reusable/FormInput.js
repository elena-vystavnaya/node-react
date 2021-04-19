import React from "react";
import { Form, Input } from "antd";

function FormInput(props) {
    const { label, name, value, rules, type, onChange } = props;

    return (
        <>
            <Form.Item
                label={label}
                name={name}
                initialValue={value}
                value={value}
                rules={rules}
                onChange={onChange}>
                {type === "password" ? (
                    <Input.Password name={name} />
                ) : (
                    <Input name={name} type={type} />
                )}
            </Form.Item>
        </>
    );
}
export default FormInput;
