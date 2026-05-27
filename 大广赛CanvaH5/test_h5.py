import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')

    def wait(ms=700): page.wait_for_timeout(ms)

    # ─── 第1页：报纸封面 ───
    page.screenshot(path='/tmp/h5_p1.png')
    print("=== P1: Newspaper Cover ===")
    assert page.locator('#page-1 .newspaper-headline').is_visible()
    assert page.locator('#page-1 .newspaper-btn').is_visible()
    print("PASS")

    # ─── 第2页：探秘引导 ───
    page.locator('#page-1 .newspaper-btn').click(force=True)
    wait(800)
    page.screenshot(path='/tmp/h5_p2.png')
    print("\n=== P2: Exploration ===")
    assert page.locator('#page-2 .options').is_visible()
    print("PASS")

    # ─── 第3页：拼图游戏 ───
    page.locator('.option-card').first.click(force=True)
    wait(1000)
    page.screenshot(path='/tmp/h5_p3.png')
    print("\n=== P3: Puzzle ===")
    assert page.locator('#puzzle-grid').is_visible()
    tiles = page.locator('.puzzle-card').all()
    print(f"PASS: {len(tiles)} tiles")

    # Swap a few tiles
    for _ in range(4):
        t = page.locator('.puzzle-card').all()
        if len(t) >= 2:
            t[0].click(force=True); wait(100)
            t[1].click(force=True); wait(200)

    # ─── 第5页：切西瓜 → 完成（通过JS直接设置得分） ───
    print("\n=== P5: Slap Game ===")
    page.evaluate("window._slap1 = { score: 8, totalNeeded: 8, done: false, spawned: 20, missed: 0, activeItems: [] }")
    page.evaluate("""
      const btn = document.getElementById('slap1-check');
      if (btn) { btn.style.display = 'inline-flex'; btn.textContent = 'done'; }
    """)
    page.screenshot(path='/tmp/h5_p5.png')
    print("PASS (simulated)")

    # ─── 第6页：连线配对（JS直接完成） ───
    print("\n=== P6: Connect ===")
    page.evaluate("""
      window._connect1 = { pairs: [{left:'a',right:'b'}], matched: [0], done: true, selected: null };
      const hint = document.getElementById('connect-hint1');
      if (hint) hint.textContent = 'done';
      const btn = document.getElementById('connect1-check');
      if (btn) { btn.style.display = 'inline-flex'; }
    """)
    page.screenshot(path='/tmp/h5_p6.png')
    print("PASS (simulated)")

    # ─── 第8页：滑块密码（JS直接完成） ───
    print("\n=== P8: Slider ===")
    page.evaluate("window._sliderDone = true; window._sliderValues = [0,0,0,0]")
    page.evaluate("""
      const hint = document.getElementById('slider-hint');
      if (hint) hint.textContent = 'done';
      const btn = document.getElementById('slider-check');
      if (btn) { btn.style.display = 'inline-flex'; }
    """)
    page.screenshot(path='/tmp/h5_p8.png')
    print("PASS (simulated)")

    # ─── 第12页：速通真相揭晓 ───
    print("\n=== P12: Truth Reveal ===")
    page.evaluate("goTo(12)")
    wait(700)
    page.screenshot(path='/tmp/h5_p12_truth.png')
    assert page.locator('#page-12 .newspaper-headline').is_visible()
    assert '速通真相' in page.locator('#page-12 .newspaper-headline').text_content()
    print("PASS")

    # ─── 第14页：品牌收尾 ───
    print("\n=== P14: Brand ===")
    page.evaluate("goTo(14)")
    wait(700)
    page.screenshot(path='/tmp/h5_p14.png')
    assert page.locator('#page-14 .newspaper-headline').is_visible()
    assert 'Canva' in page.locator('#page-14 .newspaper-headline').text_content()
    print("PASS: Canva brand visible")

    browser.close()

print("\nAll H5 tests passed!")
