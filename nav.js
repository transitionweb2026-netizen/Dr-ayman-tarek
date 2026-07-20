/*
 * Shared site navigation.
 *
 * Single source of truth for the header/nav markup used on every page of
 * the project. To add a new page to the site:
 *   1. Add { label, href } to NAV_ITEMS below (order = display order).
 *   2. In the new page's <body>, right where the header should render,
 *      optionally set window.SITE_BRAND = { icon: '<material-symbol>', name: '<Doctor Name>' }
 *      (defaults to the DEFAULT_BRAND below if omitted), then include:
 *        <script src="nav.js"></script>
 * No other markup or styling is required — every page stays in sync
 * automatically because they all render from this one file.
 */
(function () {
    "use strict";

    var NAV_ITEMS = [
        { label: "Home", href: "home.html" },
        { label: "Services", href: "services.html" },
        { label: "About", href: "about.html" },
        { label: "Contact", href: "contact.html" }
    ];

    var CTA_LABEL = "Book Appointment";

    var DEFAULT_BRAND = { icon: "neurology", name: "Dr. Ayman Tarek" };
    var brand = window.SITE_BRAND || DEFAULT_BRAND;

    function currentFile() {
        var path = window.location.pathname.split("/").pop();
        return path && path.length ? path : "home.html";
    }

    function activeLinkClass() {
        return "font-label-md text-label-md text-primary border-b-2 border-primary pb-1";
    }

    function inactiveLinkClass() {
        return "font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200";
    }

    function buildNavLinks() {
        var current = currentFile();
        return NAV_ITEMS.map(function (item) {
            var isActive = item.href === current;
            var cls = isActive ? activeLinkClass() : inactiveLinkClass();
            var current_attr = isActive ? " aria-current=\"page\"" : "";
            return '<a class="' + cls + '" href="' + item.href + '"' + current_attr + ">" + item.label + "</a>";
        }).join("\n");
    }

    function buildHeader() {
        return "" +
            '<header class="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-2xl border-b border-primary/15 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">\n' +
            '<nav class="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 w-full max-w-container-max mx-auto">\n' +
            '<a class="flex items-center gap-3" href="home.html" aria-label="Back to homepage">\n' +
            '<span class="material-symbols-outlined text-primary text-3xl drop-shadow-[0_0_10px_rgba(196,61,255,0.6)]">' + brand.icon + "</span>\n" +
            '<span class="font-headline-sm font-bold text-primary">' + brand.name + "</span>\n" +
            "</a>\n" +
            '<div class="hidden md:flex items-center gap-8">\n' +
            buildNavLinks() + "\n" +
            '<button class="ml-4 btn-gradient px-7 py-3 rounded-full font-label-md text-label-md text-white">' + CTA_LABEL + "</button>\n" +
            "</div>\n" +
            '<button class="md:hidden text-primary">\n' +
            '<span class="material-symbols-outlined text-3xl">menu</span>\n' +
            "</button>\n" +
            "</nav>\n" +
            "</header>";
    }

    document.write(buildHeader());
})();
