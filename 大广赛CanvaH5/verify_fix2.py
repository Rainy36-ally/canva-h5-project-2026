from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})

    # Force no-cache
    page.route('**/*', lambda route: route.continue_())
    page.goto('http://127.0.0.1:8899/', wait_until='networkidle')
    page.wait_for_timeout(500)

    # Check .page-newspaper is found in page 2
    pn = page.evaluate("() => !!document.querySelector('#page-2 .page-newspaper')")
    print(f"  .page-newspaper in #page-2: {pn}")

    # Check .page-newspaper computed styles in page 2
    if pn:
        s = page.evaluate("""() => {
            const el = document.querySelector('#page-2 .page-newspaper');
            const cs = getComputedStyle(el);
            return { position: cs.position, overflowY: cs.overflowY, overflowX: cs.overflowX };
        }""")
        print(f"  .page-newspaper: {s}")

    # Page 2 initial position
    print("\n=== Initial state ===")
    r1 = page.evaluate("() => { const el = document.getElementById('page-2'); return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect() }; }")
    print(f"  page-2: pos={r1['pos']}, top={r1['rect']['top']:.1f}")

    # goTo(2)
    page.evaluate("goTo(2)")
    page.wait_for_timeout(800)

    r2 = page.evaluate("() => { const el = document.getElementById('page-2'); return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect(), transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity }; }")
    print(f"\n=== After goTo(2) ===")
    print(f"  page-2: pos={r2['pos']}, top={r2['rect']['top']:.1f}, transform={r2['transform']}, opacity={r2['opacity']}")

    # Check .page-newspaper rect after goTo
    if pn:
        rn = page.evaluate("() => { const el = document.querySelector('#page-2 .page-newspaper'); if(!el) return null; return { rect: el.getBoundingClientRect() }; }")
        print(f"  .page-newspaper: top={rn['rect']['top']:.1f}")

    # goTo page 1 to check it still works
    page.evaluate("goTo(1)")
    page.wait_for_timeout(500)
    r3 = page.evaluate("() => { const el = document.getElementById('page-1'); return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect() }; }")
    print(f"\n=== Back to page 1 ===")
    print(f"  page-1: pos={r3['pos']}, top={r3['rect']['top']:.1f}")

    page.screenshot(path='/tmp/verify_fix2.png', full_page=False)
    print("\nScreenshot saved.")
    browser.close()
