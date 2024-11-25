import { Navbar, Container } from "react-bootstrap";

export function Header() {
    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Alphaboxd
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    );
}