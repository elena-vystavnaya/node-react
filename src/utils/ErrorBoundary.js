import React from "react";

const ErrorComponent = () => {
    return <h1>Something went wrong</h1>;
};

export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: { message: "", stack: "" },
        info: { componentStack: "" },
    };

    static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.setState({ error, info });
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        return hasError ? <ErrorComponent /> : children;
    }
}
