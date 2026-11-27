export const SHOP_LEVELS = {
  kitchen: [
    {
      id: 'k1', reqPlayerLv: 1, title: 'ด่าน 1: ไข่เจียวหมูสับ',
      desc: 'วางกระทะ เทน้ำมัน ใส่ไข่+หมูสับ ปรุงรส ผัด >= 2 ครั้ง แล้วตักเสิร์ฟ',
      goals: ['กระทะ + น้ำมัน', 'ไข่ + หมูสับ', 'ปรุงรส', 'ผัด >= 2 ครั้ง', 'ตักเสิร์ฟ'],
      rewardCoins: 80, rewardXp: 60,
      sample: [
        { id: 'ev_start' }, { id: 'ev_stove_on' }, { id: 'set_pan' }, { id: 'pour_oil' },
        { id: 'put_meat', val: 'egg' }, { id: 'put_meat', val: 'pork' },
        { id: 'add_sauce', val: 'soy_sauce' },
        { id: 'stir_once' }, { id: 'stir_once' }, { id: 'plate_up' }
      ],
      evaluate(st) {
        if (st.burnt) return { ok: false, reason: 'อาหารไหม้! ลืมน้ำมันหรือผัดนานเกินไป' };
        if (!st.panOn || !st.hasOil) return { ok: false, reason: 'ลืมวางกระทะหรือเทน้ำมัน' };
        if (!st.proteins.includes('egg') || !st.proteins.includes('pork')) return { ok: false, reason: 'ต้องใส่ทั้งไข่ไก่และหมูสับ' };
        if (st.seasonings.length === 0) return { ok: false, reason: 'ลืมปรุงรส' };
        if (st.stirCount < 2) return { ok: false, reason: 'ต้องผัดอย่างน้อย 2 ครั้ง' };
        if (!st.served) return { ok: false, reason: 'ยังไม่ได้ตักเสิร์ฟ' };
        return { ok: true };
      }
    },
    {
      id: 'k2', reqPlayerLv: 1, title: 'ด่าน 2: ผัดกะเพราหมูสับ',
      desc: 'เทน้ำมัน ใส่กระเทียม หมูสับ กะเพรา ซอสหอยนางรม ผัด >= 2 ครั้ง แล้วตักเสิร์ฟ',
      goals: ['น้ำมัน + กระเทียม', 'หมูสับ + กะเพรา', 'หอยนางรม', 'ผัด >= 2 ครั้ง', 'ตักเสิร์ฟ'],
      rewardCoins: 110, rewardXp: 80,
      sample: [
        { id: 'ev_start' }, { id: 'set_pan' }, { id: 'pour_oil' }, { id: 'toss_garlic' },
        { id: 'put_meat', val: 'pork' }, { id: 'put_veg', val: 'basil' },
        { id: 'add_sauce', val: 'oyster_sauce' },
        { id: 'stir_once' }, { id: 'stir_once' }, { id: 'plate_up' }
      ],
      evaluate(st) {
        if (st.burnt) return { ok: false, reason: 'กะเพราไหม้!' };
        if (!st.hasOil || !st.hasGarlic) return { ok: false, reason: 'ขาดน้ำมันหรือกระเทียม' };
        if (!st.proteins.includes('pork') || !st.vegs.includes('basil')) return { ok: false, reason: 'ขาดหมูสับหรือกะเพรา' };
        if (!st.seasonings.includes('oyster_sauce')) return { ok: false, reason: 'ต้องปรุงรสหอยนางรม' };
        if (st.stirCount < 2) return { ok: false, reason: 'ผัดยังไม่พอ' };
        if (!st.served) return { ok: false, reason: 'ยังไม่ได้ตักเสิร์ฟ' };
        return { ok: true };
      }
    },
    {
      id: 'k3', reqPlayerLv: 2, title: 'ด่าน 3: ข้าวผัดไข่',
      desc: 'ด่าน Lv.2: เทน้ำมัน กระเทียม ไข่ไก่ ข้าวสวย ซีอิ๊วขาว ผัด >= 3 ครั้ง แล้วตักเสิร์ฟ',
      goals: ['น้ำมัน + กระเทียม', 'ไข่ + ข้าวสวย', 'ซีอิ๊วขาว', 'ผัด >= 3 ครั้ง', 'ตักเสิร์ฟ'],
      rewardCoins: 140, rewardXp: 100,
      sample: [
        { id: 'ev_start' }, { id: 'set_pan' }, { id: 'pour_oil' }, { id: 'toss_garlic' },
        { id: 'put_meat', val: 'egg' }, { id: 'put_veg', val: 'rice' },
        { id: 'add_sauce', val: 'soy_sauce' },
        { id: 'stir_once' }, { id: 'stir_once' }, { id: 'stir_once' }, { id: 'plate_up' }
      ],
      evaluate(st) {
        if (st.burnt) return { ok: false, reason: 'ข้าวผัดไหม้!' };
        if (!st.hasOil || !st.hasGarlic) return { ok: false, reason: 'ขาดน้ำมันหรือกระเทียม' };
        if (!st.proteins.includes('egg') || !st.vegs.includes('rice')) return { ok: false, reason: 'ขาดไข่หรือข้าวสวย' };
        if (!st.seasonings.includes('soy_sauce')) return { ok: false, reason: 'ต้องปรุงซีอิ๊วขาว' };
        if (st.stirCount < 3) return { ok: false, reason: 'ต้องผัดอย่างน้อย 3 ครั้ง' };
        if (!st.served) return { ok: false, reason: 'ยังไม่ได้ตักเสิร์ฟ' };
        return { ok: true };
      }
    }
  ],

  boba: [
    {
      id: 'b1', reqPlayerLv: 1, title: 'ด่าน 1: ชานมไข่มุก',
      desc: 'วางแก้ว ตักไข่มุกดำ ใส่น้ำแข็ง รินชานม เลือกความหวาน เขย่า และซีลฝา',
      goals: ['แก้ว + ไข่มุกดำ', 'น้ำแข็ง + ชานม', 'ความหวาน', 'เขย่า + ซีลฝา'],
      rewardCoins: 90, rewardXp: 65,
      sample: [
        { id: 'ev_start' }, { id: 'take_cup' }, { id: 'scoop_top', val: 'tapioca' },
        { id: 'put_ice' }, { id: 'pour_tea', val: 'assam_milk' },
        { id: 'set_sweet', val: '100' }, { id: 'shake_once' }, { id: 'seal_cup' }
      ],
      evaluate(st) {
        if (!st.cupReady) return { ok: false, reason: 'ลืมวางแก้ว!' };
        if (!st.toppings.includes('tapioca')) return { ok: false, reason: 'ขาดไข่มุกดำ' };
        if (!st.hasIce || st.tea !== 'assam_milk') return { ok: false, reason: 'ขาดน้ำแข็งหรือชานม' };
        if (!st.sweetness) return { ok: false, reason: 'ยังไม่ได้เลือกความหวาน' };
        if (!st.shaken || !st.sealed) return { ok: false, reason: 'ต้องเขย่าและซีลฝา' };
        return { ok: true };
      }
    },
    {
      id: 'b2', reqPlayerLv: 1, title: 'ด่าน 2: มัทฉะพุดดิ้งหวานน้อย',
      desc: 'วางแก้ว ตักพุดดิ้ง ใส่น้ำแข็ง รินมัทฉะ เลือก 50% เขย่า และซีลฝา',
      goals: ['แก้ว + พุดดิ้ง', 'น้ำแข็ง + มัทฉะ', 'หวาน 50%', 'เขย่า + ซีลฝา'],
      rewardCoins: 120, rewardXp: 85,
      sample: [
        { id: 'ev_start' }, { id: 'take_cup' }, { id: 'scoop_top', val: 'pudding' },
        { id: 'put_ice' }, { id: 'pour_tea', val: 'matcha_latte' },
        { id: 'set_sweet', val: '50' }, { id: 'shake_once' }, { id: 'seal_cup' }
      ],
      evaluate(st) {
        if (!st.cupReady) return { ok: false, reason: 'ลืมวางแก้ว!' };
        if (!st.toppings.includes('pudding')) return { ok: false, reason: 'ขาดพุดดิ้ง' };
        if (!st.hasIce || st.tea !== 'matcha_latte') return { ok: false, reason: 'ขาดน้ำแข็งหรือมัทฉะ' };
        if (st.sweetness !== '50') return { ok: false, reason: 'ต้องเลือกหวาน 50%' };
        if (!st.shaken || !st.sealed) return { ok: false, reason: 'ต้องเขย่าและซีลฝา' };
        return { ok: true };
      }
    }
  ],

  repair: [
    {
      id: 'r1', reqPlayerLv: 1, title: 'ด่าน 1: เปลี่ยนจอ LCD',
      desc: 'ปิดเครื่อง เปิดฝาหลัง ถอดขั้วแบต เปลี่ยนจอ LCD ปัดบอร์ด เสียบขั้วแบต แล้วเปิดทดสอบ',
      goals: ['ปิดเครื่อง + เปิดฝา', 'ถอดขั้วแบต', 'เปลี่ยนจอ LCD', 'เสียบแบต + เปิดทดสอบ'],
      rewardCoins: 100, rewardXp: 75,
      sample: [
        { id: 'ev_start' }, { id: 'power_off' }, { id: 'open_case' }, { id: 'unplug_batt' },
        { id: 'swap_part', val: 'std_screen' }, { id: 'clean_pcb' },
        { id: 'plug_batt' }, { id: 'boot_phone' }
      ],
      evaluate(st) {
        if (st.shortCircuit) return { ok: false, reason: '⚡ ไฟช็อต! ต้องปิดเครื่องและถอดขั้วแบตก่อน' };
        if (!st.caseOpened) return { ok: false, reason: 'ยังไม่ได้เปิดฝาหลัง' };
        if (!st.partsReplaced.includes('std_screen')) return { ok: false, reason: 'ยังไม่ได้เปลี่ยนจอ LCD' };
        if (!st.battConnected || !st.booted) return { ok: false, reason: 'ต้องเสียบแบตกลับและเปิดทดสอบ' };
        return { ok: true };
      }
    },
    {
      id: 'r2', reqPlayerLv: 2, title: 'ด่าน 2: เปลี่ยนแบต 4500',
      desc: 'ด่าน Lv.2: ปิดเครื่อง เปิดฝา ถอดขั้วแบต เปลี่ยนแบต 4500 ปัดบอร์ด เสียบแบต แล้วเปิดทดสอบ',
      goals: ['ปิดเครื่อง + ถอดแบต', 'เปลี่ยนแบต 4500', 'ปัดบอร์ด', 'เสียบแบต + เปิดทดสอบ'],
      rewardCoins: 135, rewardXp: 95,
      sample: [
        { id: 'ev_start' }, { id: 'power_off' }, { id: 'open_case' }, { id: 'unplug_batt' },
        { id: 'swap_part', val: 'std_battery' }, { id: 'clean_pcb' },
        { id: 'plug_batt' }, { id: 'boot_phone' }
      ],
      evaluate(st) {
        if (st.shortCircuit) return { ok: false, reason: '⚡ ไฟช็อต!' };
        if (!st.partsReplaced.includes('std_battery')) return { ok: false, reason: 'ยังไม่ได้เปลี่ยนแบต 4500' };
        if (!st.boardCleaned) return { ok: false, reason: 'ยังไม่ได้ปัดบอร์ด' };
        if (!st.battConnected || !st.booted) return { ok: false, reason: 'ต้องเสียบแบตกลับและเปิดทดสอบ' };
        return { ok: true };
      }
    }
  ]
};
