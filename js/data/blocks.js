export const BLOCK_CATEGORIES = [
  { key: 'motion', label: 'Motion' },
  { key: 'events', label: 'Events' },
  { key: 'control', label: 'Control' },
  { key: 'operation', label: 'Operation' },
  { key: 'sensing', label: 'Sensing' },
  { key: 'variable', label: 'Variable' }
];

// Granular, short-label blocks split into 6 categories across all shops
export const SHOP_BLOCKS = {
  kitchen: [
    // Events
    { id: 'ev_start', label: '🚩 เริ่มทำเมนู', cat: 'events' },
    { id: 'ev_stove_on', label: '🔥 เปิดเตา', cat: 'events' },

    // Motion (movement & physical actions)
    { id: 'set_pan', label: '🍳 วางกระทะ', cat: 'motion' },
    { id: 'pour_oil', label: '🛢️ เทน้ำมัน', cat: 'motion' },
    { id: 'toss_garlic', label: '🧄 ใส่กระเทียม', cat: 'motion' },
    {
      id: 'put_meat', label: '🥩 ใส่เนื้อ', cat: 'motion',
      options: [
        { val: 'pork', text: 'หมูสับ' },
        { val: 'egg', text: 'ไข่ไก่' },
        { val: 'crispy_pork', text: 'หมูกรอบ', reqItem: 'ing_crispy_pork' },
        { val: 'river_prawn', text: 'กุ้งแม่น้ำ', reqItem: 'ing_river_prawn' }
      ]
    },
    {
      id: 'put_veg', label: '🌿 ใส่ผัก/ข้าว', cat: 'motion',
      options: [
        { val: 'basil', text: 'กะเพรา' },
        { val: 'rice', text: 'ข้าวสวย' },
        { val: 'kale', text: 'คะน้า' }
      ]
    },
    { id: 'stir_once', label: '🥄 ผัด 1 ครั้ง', cat: 'motion' },
    { id: 'plate_up', label: '🍽️ ตักเสิร์ฟ', cat: 'motion' },

    // Control
    {
      id: 'loop_next', label: '🔁 ทำซ้ำถัดไป', cat: 'control', unlockKey: 'blk_loop',
      options: [{ val: '2', text: '2x' }, { val: '3', text: '3x' }, { val: '4', text: '4x' }]
    },
    {
      id: 'set_heat', label: '🌡️ ระดับไฟ', cat: 'control', unlockKey: 'blk_heat',
      options: [{ val: 'low', text: 'อ่อน' }, { val: 'medium', text: 'กลาง' }, { val: 'high', text: 'แรง' }]
    },
    { id: 'if_guard', label: '🛡️ ถ้าไฟแรง→ลดไฟ', cat: 'control', unlockKey: 'blk_if' },

    // Operation (seasoning / combining)
    {
      id: 'add_sauce', label: '🧂 ปรุงรส', cat: 'operation',
      options: [
        { val: 'oyster_sauce', text: 'หอยนางรม' },
        { val: 'soy_sauce', text: 'ซีอิ๊วขาว' },
        { val: 'tomyum_paste', text: 'พริกเผา' }
      ]
    },

    // Sensing
    { id: 'sense_oil', label: '👁️ เช็คน้ำมัน', cat: 'sensing' },
    { id: 'sense_heat', label: '🌡️ เช็คความร้อน', cat: 'sensing' },

    // Variable
    { id: 'var_stir_plus', label: '📊 นับผัด +1', cat: 'variable' }
  ],

  boba: [
    // Events
    { id: 'ev_start', label: '🚩 เริ่มชงแก้ว', cat: 'events' },

    // Motion
    { id: 'take_cup', label: '🥤 วางแก้ว', cat: 'motion' },
    {
      id: 'scoop_top', label: '⚫ ตักท็อปปิ้ง', cat: 'motion',
      options: [
        { val: 'tapioca', text: 'ไข่มุกดำ' },
        { val: 'pudding', text: 'พุดดิ้ง' },
        { val: 'brown_sugar', text: 'บราวน์ชูการ์', reqItem: 'ing_brown_sugar' }
      ]
    },
    { id: 'put_ice', label: '🧊 ใส่น้ำแข็ง', cat: 'motion' },
    {
      id: 'pour_tea', label: '🍵 รินชา', cat: 'motion',
      options: [
        { val: 'assam_milk', text: 'ชานม' },
        { val: 'matcha_latte', text: 'มัทฉะ' },
        { val: 'thai_tea', text: 'ชาไทย' }
      ]
    },
    { id: 'add_cheese', label: '🧀 ท็อปชีส', cat: 'motion', reqItem: 'ing_cheese_foam' },
    { id: 'shake_once', label: '🍸 เขย่า 1 ครั้ง', cat: 'motion' },
    { id: 'seal_cup', label: '✨ ซีลฝา', cat: 'motion' },

    // Control
    {
      id: 'loop_next', label: '🔁 ทำซ้ำถัดไป', cat: 'control', unlockKey: 'blk_loop',
      options: [{ val: '2', text: '2x' }, { val: '3', text: '3x' }]
    },

    // Operation
    {
      id: 'set_sweet', label: '🍯 ความหวาน', cat: 'operation',
      options: [{ val: '50', text: '50%' }, { val: '100', text: '100%' }]
    },

    // Sensing
    { id: 'sense_cup', label: '👁️ เช็คแก้ว', cat: 'sensing' },

    // Variable
    { id: 'var_shake_plus', label: '📊 นับเขย่า +1', cat: 'variable' }
  ],

  repair: [
    // Events
    { id: 'ev_start', label: '🚩 เริ่มงานซ่อม', cat: 'events' },

    // Motion
    { id: 'power_off', label: '🔌 ปิดเครื่อง', cat: 'motion' },
    { id: 'open_case', label: '🪛 เปิดฝาหลัง', cat: 'motion' },
    { id: 'unplug_batt', label: '🔋 ถอดขั้วแบต', cat: 'motion' },
    {
      id: 'swap_part', label: '🔧 เปลี่ยนอะไหล่', cat: 'motion',
      options: [
        { val: 'std_screen', text: 'จอ LCD' },
        { val: 'std_battery', text: 'แบต 4500' },
        { val: 'oled_120hz', text: 'OLED 120Hz', reqItem: 'part_oled' },
        { val: 'batt_6000', text: 'แบต 6000', reqItem: 'part_batt6000' }
      ]
    },
    { id: 'clean_pcb', label: '🪥 ปัดบอร์ด', cat: 'motion' },
    { id: 'plug_batt', label: '⚡ เสียบขั้วแบต', cat: 'motion' },
    { id: 'boot_phone', label: '📱 เปิดทดสอบ', cat: 'motion' },

    // Control
    {
      id: 'loop_next', label: '🔁 ทำซ้ำถัดไป', cat: 'control', unlockKey: 'blk_loop',
      options: [{ val: '2', text: '2x' }, { val: '3', text: '3x' }]
    },

    // Operation
    { id: 'op_cal_touch', label: '⚙️ คาลิเบรตจอ', cat: 'operation' },

    // Sensing
    { id: 'sense_volt', label: '⚡ เช็คไฟแบต', cat: 'sensing' },

    // Variable
    { id: 'var_step_plus', label: '📊 นับขั้นตอน +1', cat: 'variable' }
  ]
};

export const MARKET_CATALOG = {
  blocks: [
    { id: 'blk_loop', name: '🔁 Loop ทำซ้ำ', desc: 'ทำซ้ำบล็อคถัดไป 2x–4x', price: 120 },
    { id: 'blk_heat', name: '🌡️ ระดับไฟ', desc: 'เลือกไฟอ่อน/กลาง/แรง', price: 150 },
    { id: 'blk_if', name: '🛡️ กันไหม้ IF', desc: 'ลดไฟเมื่อไฟแรงอัตโนมัติ', price: 220 }
  ],
  ingredients: [
    { id: 'ing_crispy_pork', name: '🥓 หมูกรอบ', desc: 'วัตถุดิบเมนูพิเศษ', price: 100 },
    { id: 'ing_river_prawn', name: '🦐 กุ้งแม่น้ำ', desc: 'วัตถุดิบเมนูพิเศษ', price: 140 },
    { id: 'ing_brown_sugar', name: '🧋 บราวน์ชูการ์', desc: 'ท็อปปิ้งชานมพิเศษ', price: 110 },
    { id: 'ing_cheese_foam', name: '🧀 วิปชีส', desc: 'ท็อปปิ้งชีสพ่นไฟ', price: 130 },
    { id: 'part_oled', name: '🖥️ จอ OLED', desc: 'อะไหล่จอ 120Hz', price: 160 },
    { id: 'part_batt6000', name: '🔋 แบต 6000', desc: 'แบตความจุสูง', price: 140 }
  ]
};
