// import { jwtDecode } from "jwt-decode";

// export const verifyToken = (token: string) => {
//   return jwtDecode(token);
// };
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role?: string; // Make it optional if the claim might not always exist
}

export const verifyToken = (token: string): CustomJwtPayload => {
  return jwtDecode<CustomJwtPayload>(token);
};
