import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink,} from "reactstrap";

class AppFooter extends React.Component {
  render() {
    return (
      <footer>
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink
                className="text-light text-right"
                href="https://github.com/Banq-Development/hodler-contracts"
                target="_blank"
              >
                Github
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="text-light text-right"
                href="https://docs.hodler.financial"
                target="_blank"
              >
                Docs
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </footer>
    );
  }
}

export default AppFooter;
