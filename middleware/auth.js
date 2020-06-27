export default function ({ store, redirect }) {
  // If the user is not authenticated
  const token = localStorage.getItem('soap');
  if (!token) {
    return redirect('/login');
  }
}
