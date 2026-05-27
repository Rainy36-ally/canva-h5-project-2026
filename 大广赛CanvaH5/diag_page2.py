from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')

    # Pause to let animations settle
    page.wait_for_timeout(500)

    # Inspect page-2 computed styles
    print("=== Page 2 styles ===")
    for prop in ['position', 'top', 'bottom', 'left', 'right', 'transform', 'opacity', 'display', 'visibility', 'height', 'margin-top', 'padding-top', 'flex-direction', 'justify-content', 'align-items', 'overflow', 'z-index']:
        val = page.evaluate(f"(el) => getComputedStyle(el).{prop}", page.locator('#page-2').element_handle())
        print(f"  {prop}: {val}")

    # Check bounding rects
    print("\n=== Bounding rects ===")
    p2_rect = page.evaluate("(el) => el.getBoundingClientRect()", page.locator('#page-2').element_handle())
    print(f"  #page-2: top={p2_rect['top']:.1f}, bottom={p2_rect['bottom']:.1f}, height={p2_rect['height']:.1f}, left={p2_rect['left']:.1f}")

    p2n_rect = page.evaluate("(el) => el.getBoundingClientRect()", page.locator('#page-2 .page-newspaper').element_handle())
    print(f"  .page-newspaper: top={p2n_rect['top']:.1f}, bottom={p2n_rect['bottom']:.1f}, height={p2n_rect['height']:.1f}, left={p2n_rect['left']:.1f}")

    masthead_rect = page.evaluate("(el) => el.getBoundingClientRect()", page.locator('#page-2 .newspaper-masthead').element_handle())
    print(f"  .newspaper-masthead: top={masthead_rect['top']:.1f}, bottom={masthead_rect['bottom']:.1f}")

    body_rect = page.evaluate("(el) => el.getBoundingClientRect()", page.locator('#page-2 .newspaper-body').element_handle())
    print(f"  .newspaper-body: top={body_rect['top']:.1f}, bottom={body_rect['bottom']:.1f}")

    options_rect = page.evaluate("(el) => el.getBoundingClientRect()", page.locator('#page-2 .options').element_handle())
    print(f"  .options: top={options_rect['top']:.1f}, bottom={options_rect['bottom']:.1f}")

    # Check classes
    print(f"\n=== Classes ===")
    classes = page.evaluate("(el) => el.className", page.locator('#page-2').element_handle())
    print(f"  #page-2 classes: {classes}")

    # Check parent structure
    print(f"\n=== Parent chain ===")
    parent = page.evaluate("(el) => { let p = el.parentElement; let chain = []; for(let i=0;i<5&&p;i++){chain.push(p.tagName+'.'+p.className);p=p.parentElement;} return chain; }", page.locator('#page-2').element_handle())
    for c in parent: print(f"  {c}")

    # Check ALL pages positions
    print(f"\n=== All pages bounding rects ===")
    for i in range(1, 15):
        el = page.locator(f'#page-{i}').element_handle()
        if el:
            r = page.evaluate("(el) => el.getBoundingClientRect()", el)
            active = page.evaluate("(el) => el.classList.contains('active')", el)
            print(f"  #page-{i}: top={r['top']:.1f}, h={r['height']:.1f}, active={active}")

    page.screenshot(path='/tmp/diag_page2.png', full_page=False)
    print("\nScreenshot saved to /tmp/diag_page2.png")

    browser.close()
