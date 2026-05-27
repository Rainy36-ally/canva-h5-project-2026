from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})

    # Inject cache buster before navigation
    page.add_init_script("""() => {
        const link = document.querySelector('link[rel=stylesheet]');
        if (link) {
            const url = new URL(link.href);
            url.searchParams.set('_t', Date.now());
            link.href = url.toString();
        }
    }""")

    page.goto('http://127.0.0.1:8899/', wait_until='networkidle')
    page.wait_for_timeout(500)

    # Verify CSS was freshly loaded
    css_loaded = page.evaluate("() => document.querySelector('link[rel=stylesheet]').href")
    print(f"CSS loaded from: {css_loaded}")

    # Check classes on page-2
    classes = page.evaluate("() => document.getElementById('page-2').className")
    print(f"page-2 classes: '{classes}'")

    # Check page-newspaper on #page-2 (not descendant)
    pn_direct = page.evaluate("() => document.getElementById('page-2').classList.contains('page-newspaper')")
    print(f"page-2 has .page-newspaper: {pn_direct}")

    # Check descendant
    pn_desc = page.evaluate("() => !!document.querySelector('#page-2 .page-newspaper')")
    print(f"#page-2 .page-newspaper (descendant): {pn_desc}")

    # Check page-newspaper styles on #page-2 itself
    if pn_direct:
        s = page.evaluate("""() => {
            const el = document.getElementById('page-2');
            const cs = getComputedStyle(el);
            return { position: cs.position, overflowY: cs.overflowY, overflowX: cs.overflowX };
        }""")
        print(f"#page-2 computed: {s}")

    # goTo(2) and verify
    page.evaluate("goTo(2)")
    page.wait_for_timeout(800)

    print("\n=== After goTo(2) ===")
    r2 = page.evaluate("() => { const el = document.getElementById('page-2'); return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect(), transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity }; }")
    print(f"  pos={r2['pos']}, top={r2['rect']['top']:.1f}, op={r2['opacity']}")

    # Check page-newspaper elements inside page-2
    elems = page.evaluate("() => document.querySelectorAll('#page-2 .newspaper-masthead, #page-2 .newspaper-body, #page-2 .newspaper-headline, #page-2 .options').length")
    print(f"  content elements found: {elems}")

    # Check rect of newspaper-body
    body_r = page.evaluate("() => { const el = document.querySelector('#page-2 .newspaper-body'); return el ? el.getBoundingClientRect() : null; }")
    if body_r:
        print(f"  .newspaper-body: top={body_r['top']:.1f}")

    page.screenshot(path='/tmp/verify_fix3.png', full_page=False)
    print("Screenshot saved.")
    browser.close()
