export const Loader = () => {
  return <p style={{ textAlign: "center" }}>Loading, please wait...</p>;
};

export function Empty({ message }: { message: string }) {
  return <p style={{ textAlign: "center", color: "gray" }}>{message}</p>;
}
