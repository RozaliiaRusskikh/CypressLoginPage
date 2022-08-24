describe("Login functionality", () => {
  const firstName = "Roza";
  const errorMessage = "Invalid email or password provided.";
  let creds = "";

  function populateLoginPage(username, password) {
    cy.get("#Email").type(username);
    cy.get("#Password").type(password);
    cy.get('button[type="submit"]').contains("Sign In").click();
  }

  beforeEach("Opens the Login page", () => {
    cy.fixture("userLoginDetails").then((usersCreds) => {
      creds = usersCreds;
    });
    cy.visit("/");
    cy.get("#menu-toggle").click();
    cy.contains("Sign In").click();
    cy.url().should("include", "/sign-in");
    cy.title().should("eq", "Sign In - Monstercat");
  });

  it("Checks login success", () => {
    populateLoginPage(creds[0].username, creds[0].password);
    cy.wait(2000);
    cy.get("#menu-toggle").click();
    cy.get("h4").should("contain", `Hi, ${firstName}`);
  });

  it("Checks invalid login with incorrect username", () => {
    populateLoginPage(creds[1].username, creds[1].password);
    cy.contains("Invalid email or password provided.");
  });

  it("Checks invalid login with incorrect password", () => {
    populateLoginPage(creds[2].username, creds[2].password);
    cy.contains(errorMessage);
  });

  it("Checks missing username", () => {
    cy.get("#Password").type(creds[0].password);
    cy.get('button[type="submit"]').contains("Sign In").click();
    cy.contains(errorMessage);
  });

  it("Checks missing password", () => {
    cy.get("#Email").type(creds[0].username);
    cy.get('button[type="submit"]').contains("Sign In").click();
    cy.contains(errorMessage);
  });

  it("Checks all missing creds", () => {
    cy.get('button[type="submit"]').contains("Sign In").click();
    cy.contains(errorMessage);
  });
});
