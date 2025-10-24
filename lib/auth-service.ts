interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface AuthResult {
  success: boolean
  message: string
  user?: User
}

export const authService = {
  signup(email: string, firstName: string, lastName: string, password: string): AuthResult {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((u: any) => u.email === email)) {
      return { success: false, message: "Email already registered" }
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      password: btoa(password), // Simple encoding (not production safe)
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify({ id: newUser.id, email, firstName, lastName }))

    return {
      success: true,
      message: "Account created successfully",
      user: { id: newUser.id, email, firstName, lastName },
    }
  },

  login(email: string, password: string): AuthResult {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === btoa(password))

    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }),
    )

    return {
      success: true,
      message: "Logged in successfully",
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    }
  },

  logout() {
    localStorage.removeItem("currentUser")
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  },
}
