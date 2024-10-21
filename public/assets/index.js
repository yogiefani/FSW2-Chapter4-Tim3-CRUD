document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("deleted");
  const createdEntity = urlParams.get("createdEntity");

  if (status === "success") {
    Swal.fire({
      title: "Success!",
      text: `${createdEntity} has been successfully deleted!`,
      icon: "success",
      confirmButtonText: "OK",
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("created");
  const createdEntity = urlParams.get("createdEntity");

  if (status === "success") {
    Swal.fire({
      title: "Success!",
      text: `${createdEntity} has been successfully created!`,
      icon: "success",
      confirmButtonText: "OK",
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("updated");
  const createdEntity = urlParams.get("createdEntity");

  if (status === "success") {
    Swal.fire({
      title: "Success!",
      text: `${createdEntity} has been successfully updated!`,
      icon: "success",
      confirmButtonText: "OK",
    });
  }
});
