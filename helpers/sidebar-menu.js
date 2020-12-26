const getSidebarMenu = (role = "USER_ROLE") => {

    let menu = [
        {
          titulo: "Dashboard",
          icono: "mdi mdi-gauge",
          submenu: [
            { titulo: "Main", url: "/"},
            { titulo: "ProgressBar", url: "progress"},
            { titulo: "Gráficas", url: "grafica1"},
            { titulo: "Promesas", url: "promesas"},
            { titulo: "Rxjs", url: "rxjs"},
          ]
        },
        {
          titulo: "Mantenimiento",
          icono: "mdi mdi-folder-lock-open",
          submenu: [
            { titulo: "Usuarios", url: "usuarios"},
            { titulo: "Hospitales", url: "hospitales"},
            { titulo: "Medicos", url: "medicos"}
          ]
        }
    ];

    if (role === "ADMIN_ROLE") {
        return menu;
    }
    menu[1].submenu = menu[1].submenu.filter(item => item.titulo !== "Usuarios" );
    return menu;
}

module.exports = {
    getSidebarMenu
}