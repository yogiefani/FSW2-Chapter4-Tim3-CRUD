document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("deleted");

  if (status === "success") {
    Swal.fire({
      title: "Success!",
      text: "User has been successfully deleted!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
});
