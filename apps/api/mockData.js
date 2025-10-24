export const modules = [
  { code: 'CZ2001', title: 'Algorithms', au: 3, school: 'SCSE', description: 'Algorithm design and analysis' },
  { code: 'CZ2002', title: 'Database Systems', au: 3, school: 'SCSE', description: 'Database design and implementation' },
  { code: 'CZ2005', title: 'Operating Systems', au: 3, school: 'SCSE', description: 'OS concepts and implementation' },
  { code: 'CZ2006', title: 'Software Engineering', au: 3, school: 'SCSE', description: 'Software development lifecycle' },
  { code: 'CZ3001', title: 'Advanced Computer Architecture', au: 4, school: 'SCSE', description: 'Computer architecture principles' },
  { code: 'CZ3003', title: 'Software Systems Analysis & Design', au: 4, school: 'SCSE', description: 'Systems analysis and design' },
  { code: 'CZ3004', title: 'Multidisciplinary Design Project', au: 3, school: 'SCSE', description: 'Robotics and AI project' },
  { code: 'CZ3005', title: 'Artificial Intelligence', au: 3, school: 'SCSE', description: 'AI techniques and applications' },
  { code: 'CZ3006', title: 'Net-Centric Computing', au: 3, school: 'SCSE', description: 'Network programming' },
  { code: 'CZ3007', title: 'Compiler Techniques', au: 3, school: 'SCSE', description: 'Compiler design and implementation' },
  { code: 'CZ4001', title: 'Virtual & Augmented Reality', au: 3, school: 'SCSE', description: 'VR/AR technologies' },
  { code: 'CZ4003', title: 'Computer Vision', au: 3, school: 'SCSE', description: 'Image processing and vision' },
  { code: 'CZ4013', title: 'Distributed Systems', au: 3, school: 'SCSE', description: 'Distributed computing concepts' },
  { code: 'CZ4031', title: 'Database System Principles', au: 3, school: 'SCSE', description: 'Advanced database topics' },
  { code: 'CZ4034', title: 'Information Retrieval', au: 3, school: 'SCSE', description: 'Search and retrieval systems' }
]

export const class_indexes = [
  // CZ2001 Algorithms
  { module_code: 'CZ2001', index_code: '101', day_of_week: 1, start_time: '10:30', end_time: '12:30', venue: 'LT1', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2001', index_code: '101', day_of_week: 3, start_time: '10:30', end_time: '11:30', venue: 'TR+1', type: 'TUT', capacity: 40 },
  { module_code: 'CZ2001', index_code: '102', day_of_week: 2, start_time: '14:30', end_time: '16:30', venue: 'LT2', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2001', index_code: '102', day_of_week: 4, start_time: '09:30', end_time: '10:30', venue: 'TR+2', type: 'TUT', capacity: 40 },
  { module_code: 'CZ2001', index_code: '103', day_of_week: 3, start_time: '16:30', end_time: '18:30', venue: 'LT1', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2001', index_code: '103', day_of_week: 5, start_time: '14:30', end_time: '15:30', venue: 'TR+1', type: 'TUT', capacity: 40 },

  // CZ2002 Database Systems
  { module_code: 'CZ2002', index_code: '201', day_of_week: 1, start_time: '08:30', end_time: '10:30', venue: 'LT3', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2002', index_code: '201', day_of_week: 5, start_time: '10:30', end_time: '11:30', venue: 'TR+3', type: 'TUT', capacity: 40 },
  { module_code: 'CZ2002', index_code: '202', day_of_week: 2, start_time: '12:30', end_time: '14:30', venue: 'LT3', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2002', index_code: '202', day_of_week: 4, start_time: '11:30', end_time: '12:30', venue: 'TR+3', type: 'TUT', capacity: 40 },
  { module_code: 'CZ2002', index_code: '203', day_of_week: 4, start_time: '14:30', end_time: '16:30', venue: 'LT3', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2002', index_code: '203', day_of_week: 1, start_time: '15:30', end_time: '16:30', venue: 'TR+3', type: 'TUT', capacity: 40 },

  // CZ2005 Operating Systems
  { module_code: 'CZ2005', index_code: '301', day_of_week: 3, start_time: '14:30', end_time: '16:30', venue: 'LT4', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2005', index_code: '301', day_of_week: 5, start_time: '08:30', end_time: '09:30', venue: 'TR+4', type: 'TUT', capacity: 40 },
  { module_code: 'CZ2005', index_code: '302', day_of_week: 1, start_time: '12:30', end_time: '14:30', venue: 'LT4', type: 'LEC', capacity: 200 },
  { module_code: 'CZ2005', index_code: '302', day_of_week: 4, start_time: '12:30', end_time: '13:30', venue: 'TR+4', type: 'TUT', capacity: 40 },

  // CZ2006 Software Engineering
  { module_code: 'CZ2006', index_code: '401', day_of_week: 2, start_time: '09:30', end_time: '11:30', venue: 'LT19', type: 'LEC', capacity: 180 },
  { module_code: 'CZ2006', index_code: '401', day_of_week: 4, start_time: '16:30', end_time: '17:30', venue: 'TR+5', type: 'TUT', capacity: 40 },
  { module_code: 'CZ2006', index_code: '402', day_of_week: 1, start_time: '14:30', end_time: '16:30', venue: 'LT19', type: 'LEC', capacity: 180 },
  { module_code: 'CZ2006', index_code: '402', day_of_week: 3, start_time: '13:30', end_time: '14:30', venue: 'TR+5', type: 'TUT', capacity: 40 },

  // CZ3001 Advanced Computer Architecture
  { module_code: 'CZ3001', index_code: '501', day_of_week: 1, start_time: '16:30', end_time: '18:30', venue: 'LT5', type: 'LEC', capacity: 150 },
  { module_code: 'CZ3001', index_code: '501', day_of_week: 2, start_time: '08:30', end_time: '10:30', venue: 'LAB1', type: 'LAB', capacity: 30 },
  { module_code: 'CZ3001', index_code: '502', day_of_week: 3, start_time: '09:30', end_time: '11:30', venue: 'LT5', type: 'LEC', capacity: 150 },
  { module_code: 'CZ3001', index_code: '502', day_of_week: 4, start_time: '08:30', end_time: '10:30', venue: 'LAB2', type: 'LAB', capacity: 30 },

  // CZ3003 Software Systems Analysis & Design
  { module_code: 'CZ3003', index_code: '601', day_of_week: 2, start_time: '16:30', end_time: '18:30', venue: 'LT7', type: 'LEC', capacity: 150 },
  { module_code: 'CZ3003', index_code: '601', day_of_week: 5, start_time: '13:30', end_time: '15:30', venue: 'TR+6', type: 'TUT', capacity: 40 },
  { module_code: 'CZ3003', index_code: '602', day_of_week: 4, start_time: '09:30', end_time: '11:30', venue: 'LT7', type: 'LEC', capacity: 150 },
  { module_code: 'CZ3003', index_code: '602', day_of_week: 1, start_time: '09:30', end_time: '11:30', venue: 'TR+6', type: 'TUT', capacity: 40 },

  // CZ3004 Multidisciplinary Design Project
  { module_code: 'CZ3004', index_code: '701', day_of_week: 2, start_time: '10:30', end_time: '12:30', venue: 'LT8', type: 'LEC', capacity: 120 },
  { module_code: 'CZ3004', index_code: '701', day_of_week: 3, start_time: '16:30', end_time: '19:30', venue: 'LAB3', type: 'LAB', capacity: 30 },
  { module_code: 'CZ3004', index_code: '702', day_of_week: 5, start_time: '09:30', end_time: '11:30', venue: 'LT8', type: 'LEC', capacity: 120 },
  { module_code: 'CZ3004', index_code: '702', day_of_week: 1, start_time: '16:30', end_time: '19:30', venue: 'LAB4', type: 'LAB', capacity: 30 },

  // CZ3005 Artificial Intelligence
  { module_code: 'CZ3005', index_code: '801', day_of_week: 1, start_time: '09:30', end_time: '11:30', venue: 'LT9', type: 'LEC', capacity: 180 },
  { module_code: 'CZ3005', index_code: '801', day_of_week: 4, start_time: '14:30', end_time: '15:30', venue: 'TR+7', type: 'TUT', capacity: 40 },
  { module_code: 'CZ3005', index_code: '802', day_of_week: 3, start_time: '13:30', end_time: '15:30', venue: 'LT9', type: 'LEC', capacity: 180 },
  { module_code: 'CZ3005', index_code: '802', day_of_week: 2, start_time: '15:30', end_time: '16:30', venue: 'TR+7', type: 'TUT', capacity: 40 },

  // CZ3006 Net-Centric Computing
  { module_code: 'CZ3006', index_code: '901', day_of_week: 2, start_time: '08:30', end_time: '10:30', venue: 'LT10', type: 'LEC', capacity: 150 },
  { module_code: 'CZ3006', index_code: '901', day_of_week: 5, start_time: '16:30', end_time: '17:30', venue: 'TR+8', type: 'TUT', capacity: 40 },
  { module_code: 'CZ3006', index_code: '902', day_of_week: 4, start_time: '13:30', end_time: '15:30', venue: 'LT10', type: 'LEC', capacity: 150 },
  { module_code: 'CZ3006', index_code: '902', day_of_week: 1, start_time: '11:30', end_time: '12:30', venue: 'TR+8', type: 'TUT', capacity: 40 },

  // CZ3007 Compiler Techniques
  { module_code: 'CZ3007', index_code: '1001', day_of_week: 3, start_time: '08:30', end_time: '10:30', venue: 'LT11', type: 'LEC', capacity: 120 },
  { module_code: 'CZ3007', index_code: '1001', day_of_week: 1, start_time: '13:30', end_time: '15:30', venue: 'LAB5', type: 'LAB', capacity: 30 },
  { module_code: 'CZ3007', index_code: '1002', day_of_week: 5, start_time: '11:30', end_time: '13:30', venue: 'LT11', type: 'LEC', capacity: 120 },
  { module_code: 'CZ3007', index_code: '1002', day_of_week: 3, start_time: '13:30', end_time: '15:30', venue: 'LAB6', type: 'LAB', capacity: 30 },

  // CZ4001 Virtual & Augmented Reality
  { module_code: 'CZ4001', index_code: '1101', day_of_week: 1, start_time: '11:30', end_time: '13:30', venue: 'LT12', type: 'LEC', capacity: 100 },
  { module_code: 'CZ4001', index_code: '1101', day_of_week: 3, start_time: '11:30', end_time: '13:30', venue: 'LAB7', type: 'LAB', capacity: 30 },
  { module_code: 'CZ4001', index_code: '1102', day_of_week: 4, start_time: '16:30', end_time: '18:30', venue: 'LT12', type: 'LEC', capacity: 100 },
  { module_code: 'CZ4001', index_code: '1102', day_of_week: 2, start_time: '13:30', end_time: '15:30', venue: 'LAB8', type: 'LAB', capacity: 30 },

  // CZ4003 Computer Vision
  { module_code: 'CZ4003', index_code: '1201', day_of_week: 2, start_time: '11:30', end_time: '13:30', venue: 'LT13', type: 'LEC', capacity: 120 },
  { module_code: 'CZ4003', index_code: '1201', day_of_week: 5, start_time: '09:30', end_time: '11:30', venue: 'TR+9', type: 'TUT', capacity: 40 },
  { module_code: 'CZ4003', index_code: '1202', day_of_week: 4, start_time: '08:30', end_time: '10:30', venue: 'LT13', type: 'LEC', capacity: 120 },
  { module_code: 'CZ4003', index_code: '1202', day_of_week: 1, start_time: '16:30', end_time: '18:30', venue: 'TR+9', type: 'TUT', capacity: 40 },

  // CZ4013 Distributed Systems
  { module_code: 'CZ4013', index_code: '1301', day_of_week: 3, start_time: '12:30', end_time: '14:30', venue: 'LT14', type: 'LEC', capacity: 100 },
  { module_code: 'CZ4013', index_code: '1301', day_of_week: 5, start_time: '15:30', end_time: '16:30', venue: 'TR+10', type: 'TUT', capacity: 40 },
  { module_code: 'CZ4013', index_code: '1302', day_of_week: 1, start_time: '08:30', end_time: '10:30', venue: 'LT14', type: 'LEC', capacity: 100 },
  { module_code: 'CZ4013', index_code: '1302', day_of_week: 2, start_time: '16:30', end_time: '17:30', venue: 'TR+10', type: 'TUT', capacity: 40 },

  // CZ4031 Database System Principles
  { module_code: 'CZ4031', index_code: '1401', day_of_week: 2, start_time: '14:30', end_time: '16:30', venue: 'LT15', type: 'LEC', capacity: 120 },
  { module_code: 'CZ4031', index_code: '1401', day_of_week: 4, start_time: '10:30', end_time: '12:30', venue: 'LAB9', type: 'LAB', capacity: 30 },
  { module_code: 'CZ4031', index_code: '1402', day_of_week: 5, start_time: '14:30', end_time: '16:30', venue: 'LT15', type: 'LEC', capacity: 120 },
  { module_code: 'CZ4031', index_code: '1402', day_of_week: 3, start_time: '09:30', end_time: '11:30', venue: 'LAB10', type: 'LAB', capacity: 30 },

  // CZ4034 Information Retrieval
  { module_code: 'CZ4034', index_code: '1501', day_of_week: 1, start_time: '15:30', end_time: '17:30', venue: 'LT16', type: 'LEC', capacity: 100 },
  { module_code: 'CZ4034', index_code: '1501', day_of_week: 4, start_time: '15:30', end_time: '16:30', venue: 'TR+11', type: 'TUT', capacity: 40 },
  { module_code: 'CZ4034', index_code: '1502', day_of_week: 3, start_time: '10:30', end_time: '12:30', venue: 'LT16', type: 'LEC', capacity: 100 },
  { module_code: 'CZ4034', index_code: '1502', day_of_week: 5, start_time: '12:30', end_time: '13:30', venue: 'TR+11', type: 'TUT', capacity: 40 }
]

export const prerequisites = [
  // Year 2 prerequisites
  { module_code: 'CZ2001', requires_code: 'CZ1007' }, // Algorithms needs Data Structures
  { module_code: 'CZ2002', requires_code: 'CZ1007' }, // Database needs Data Structures
  { module_code: 'CZ2005', requires_code: 'CZ1007' }, // OS needs Data Structures
  { module_code: 'CZ2006', requires_code: 'CZ2001' }, // SE needs Algorithms
  
  // Year 3 prerequisites
  { module_code: 'CZ3001', requires_code: 'CZ1006' }, // Adv Arch needs Computer Architecture
  { module_code: 'CZ3003', requires_code: 'CZ2006' }, // Systems Analysis needs SE
  { module_code: 'CZ3004', requires_code: 'CZ3005' }, // MDP needs AI
  { module_code: 'CZ3005', requires_code: 'CZ2001' }, // AI needs Algorithms
  { module_code: 'CZ3006', requires_code: 'CZ2002' }, // Net-Centric needs Database
  { module_code: 'CZ3007', requires_code: 'CZ2001' }, // Compiler needs Algorithms
  
  // Year 4 prerequisites
  { module_code: 'CZ4001', requires_code: 'CZ3005' }, // VR/AR needs AI
  { module_code: 'CZ4003', requires_code: 'CZ3005' }, // Computer Vision needs AI
  { module_code: 'CZ4013', requires_code: 'CZ2005' }, // Distributed Systems needs OS
  { module_code: 'CZ4031', requires_code: 'CZ2002' }, // DB Principles needs Database Systems
  { module_code: 'CZ4034', requires_code: 'CZ2001' }  // Info Retrieval needs Algorithms
]
