import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import MockAdapter from 'axios-mock-adapter'

// Sample user data
const users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123'
  }
]

// Sample notes data
let notes = [
  {
    id: '1',
    title: 'Welcome to NoteSync',
    content: 'This is your first note. You can edit or delete it, or create new notes.',
    summary: 'Welcome note with basic instructions for using the application.',
    tags: ['welcome', 'getting-started'],
    createdAt: '2023-08-25T14:00:00Z',
    updatedAt: '2023-08-25T14:00:00Z',
    userId: '1'
  },
  {
    id: '2',
    title: 'Meeting Notes: Project Kickoff',
    content: 'Discussed project timeline, assigned tasks, and set up weekly check-ins. Key points: launch date is October 15, marketing materials need to be ready by September 30.',
    summary: 'Project kickoff meeting notes with timeline and key deliverables.',
    tags: ['meeting', 'project'],
    createdAt: '2023-08-24T10:30:00Z',
    updatedAt: '2023-08-24T10:30:00Z',
    userId: '1'
  },
  {
    id: '3',
    title: 'Ideas for New Features',
    content: 'Here are some ideas for new app features:\n- Dark mode\n- Export notes to PDF\n- Voice recording\n- Collaborative editing\n- Reminder notifications',
    summary: 'List of potential new features for the application.',
    tags: ['ideas', 'features', 'development'],
    createdAt: '2023-08-23T09:15:00Z',
    updatedAt: '2023-08-23T09:15:00Z',
    userId: '1'
  },
  {
    id: '4',
    title: 'Book Recommendations',
    content: 'Books to read:\n1. "Atomic Habits" by James Clear\n2. "Deep Work" by Cal Newport\n3. "The Psychology of Money" by Morgan Housel\n4. "Four Thousand Weeks" by Oliver Burkeman',
    summary: 'List of recommended books to read.',
    tags: ['books', 'reading'],
    createdAt: '2023-08-22T16:45:00Z',
    updatedAt: '2023-08-22T16:45:00Z',
    userId: '1'
  },
  {
    id: '5',
    title: 'Weekly Goals',
    content: '- Finish project proposal\n- Prepare for client meeting\n- Update portfolio website\n- Complete online course module\n- Schedule doctor appointment',
    summary: 'Weekly goals and tasks to accomplish.',
    tags: ['goals', 'productivity'],
    createdAt: '2023-08-21T11:20:00Z',
    updatedAt: '2023-08-21T11:20:00Z',
    userId: '1'
  },
  {
    id: '6',
    title: 'Recipe: Pasta Primavera',
    content: 'Ingredients:\n- 8oz pasta\n- 2 cups mixed vegetables\n- 2 cloves garlic\n- 1/4 cup olive oil\n- Salt and pepper to taste\n- Grated parmesan\n\nInstructions:\n1. Cook pasta according to package\n2. Sauté vegetables and garlic\n3. Mix everything together\n4. Top with parmesan',
    summary: 'Recipe for pasta primavera with ingredients and instructions.',
    tags: ['recipe', 'food', 'cooking'],
    createdAt: '2023-08-20T19:10:00Z',
    updatedAt: '2023-08-20T19:10:00Z',
    userId: '1'
  },
  {
    id: '7',
    title: 'Workout Plan',
    content: 'Monday: Upper body\nTuesday: Lower body\nWednesday: Cardio\nThursday: Rest\nFriday: Full body\nSaturday: Yoga\nSunday: Rest',
    summary: 'Weekly workout schedule with exercises for each day.',
    tags: ['fitness', 'health'],
    createdAt: '2023-08-19T08:00:00Z',
    updatedAt: '2023-08-19T08:00:00Z',
    userId: '1'
  },
  {
    id: '8',
    title: 'Travel Itinerary: Weekend Getaway',
    content: 'Friday:\n- Depart at 3pm\n- Check in to hotel by 6pm\n- Dinner reservation at 8pm\n\nSaturday:\n- Breakfast at hotel\n- Hiking trip (10am-2pm)\n- Spa appointment at 4pm\n- Dinner at local restaurant\n\nSunday:\n- Brunch at 10am\n- Local museum visit\n- Return home by 6pm',
    summary: 'Weekend getaway plan with detailed itinerary.',
    tags: ['travel', 'planning'],
    createdAt: '2023-08-18T14:30:00Z',
    updatedAt: '2023-08-18T14:30:00Z',
    userId: '1'
  },
  {
    id: '9',
    title: 'Learning Resources for JavaScript',
    content: 'Websites:\n- MDN Web Docs\n- JavaScript.info\n- FreeCodeCamp\n\nBooks:\n- "Eloquent JavaScript"\n- "You Don\'t Know JS"\n\nCourses:\n- Frontend Masters\n- Wes Bos JavaScript30\n- Udemy - Modern JavaScript',
    summary: 'Collection of JavaScript learning resources including websites, books, and courses.',
    tags: ['javascript', 'programming', 'learning'],
    createdAt: '2023-08-17T10:15:00Z',
    updatedAt: '2023-08-17T10:15:00Z',
    userId: '1'
  },
  {
    id: '10',
    title: 'Home Renovation Ideas',
    content: 'Kitchen:\n- Replace countertops\n- New backsplash\n- Paint cabinets\n\nLiving Room:\n- New sofa\n- Area rug\n- Wall art\n\nBathroom:\n- Update fixtures\n- New shower curtain\n- Storage solutions',
    summary: 'Home renovation ideas for different rooms with specific tasks and items.',
    tags: ['home', 'renovation', 'decor'],
    createdAt: '2023-08-16T15:45:00Z',
    updatedAt: '2023-08-16T15:45:00Z',
    userId: '1'
  }
]

// Setup mock API
export const setupMockAPI = (api) => {
  const mock = new MockAdapter(api, { delayResponse: 500 })

  // Authentication endpoints
  mock.onPost('/auth/login').reply((config) => {
    const { email, password } = JSON.parse(config.data)
    const user = users.find(user => user.email === email && user.password === password)
    
    if (user) {
      const { password, ...userWithoutPassword } = user
      return [200, {
        token: 'mock-jwt-token',
        user: userWithoutPassword
      }]
    }
    
    return [401, { message: 'Invalid email or password' }]
  })

  mock.onPost('/auth/register').reply((config) => {
    const userData = JSON.parse(config.data)
    const existingUser = users.find(user => user.email === userData.email)
    
    if (existingUser) {
      return [400, { message: 'Email already in use' }]
    }
    
    const newUser = {
      id: uuidv4(),
      ...userData
    }
    
    users.push(newUser)
    
    const { password, ...userWithoutPassword } = newUser
    
    return [201, {
      token: 'mock-jwt-token',
      user: userWithoutPassword
    }]
  })

  mock.onPost('/auth/logout').reply(200, { message: 'Logged out successfully' })

  mock.onGet('/auth/me').reply(200, {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com'
  })

  // Notes endpoints
  mock.onGet(/\/notes\?page=(\d+)&limit=(\d+)/).reply((config) => {
    const page = parseInt(config.url.match(/page=(\d+)/)[1])
    const limit = parseInt(config.url.match(/limit=(\d+)/)[1])
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    const paginatedNotes = notes.slice(startIndex, endIndex)
    
    return [200, {
      notes: paginatedNotes,
      currentPage: page,
      totalPages: Math.ceil(notes.length / limit),
      totalNotes: notes.length,
      limit
    }]
  })

  mock.onGet(/\/notes\/([^/]+)/).reply((config) => {
    const id = config.url.match(/\/notes\/([^/]+)/)[1]
    const note = notes.find(note => note.id === id)
    
    if (note) {
      return [200, note]
    }
    
    return [404, { message: 'Note not found' }]
  })

  mock.onPost('/notes').reply((config) => {
    const newNote = JSON.parse(config.data)
    const id = uuidv4()
    const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")
    
    // Generate a summary using the first 100 characters
    const summary = newNote.content.length > 100 
      ? `${newNote.content.substring(0, 100)}...` 
      : newNote.content
    
    const createdNote = {
      id,
      ...newNote,
      summary,
      createdAt: now,
      updatedAt: now,
      userId: '1' // Assuming the logged-in user with ID 1
    }
    
    notes.unshift(createdNote) // Add to the beginning for newest first
    
    return [201, createdNote]
  })

  mock.onPut(/\/notes\/([^/]+)/).reply((config) => {
    const id = config.url.match(/\/notes\/([^/]+)/)[1]
    const updatedNoteData = JSON.parse(config.data)
    const noteIndex = notes.findIndex(note => note.id === id)
    
    if (noteIndex !== -1) {
      // Generate a new summary if content changed
      let summary = notes[noteIndex].summary
      if (updatedNoteData.content && updatedNoteData.content !== notes[noteIndex].content) {
        summary = updatedNoteData.content.length > 100 
          ? `${updatedNoteData.content.substring(0, 100)}...` 
          : updatedNoteData.content
      }
      
      const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")
      
      notes[noteIndex] = {
        ...notes[noteIndex],
        ...updatedNoteData,
        summary,
        updatedAt: now
      }
      
      return [200, notes[noteIndex]]
    }
    
    return [404, { message: 'Note not found' }]
  })

  mock.onDelete(/\/notes\/([^/]+)/).reply((config) => {
    const id = config.url.match(/\/notes\/([^/]+)/)[1]
    const noteIndex = notes.findIndex(note => note.id === id)
    
    if (noteIndex !== -1) {
      notes = notes.filter(note => note.id !== id)
      return [204]
    }
    
    return [404, { message: 'Note not found' }]
  })

  // Search notes
  mock.onGet(/\/notes\/search/).reply((config) => {
    const url = new URL(`http://dummy.com${config.url}`)
    const query = url.searchParams.get('query') || ''
    const tags = url.searchParams.getAll('tags') || []
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '9')
    
    let filteredNotes = [...notes]
    
    // Filter by search query
    if (query) {
      const lowerCaseQuery = query.toLowerCase()
      filteredNotes = filteredNotes.filter(note => 
        note.title.toLowerCase().includes(lowerCaseQuery) || 
        note.content.toLowerCase().includes(lowerCaseQuery)
      )
    }
    
    // Filter by tags
    if (tags.length > 0) {
      filteredNotes = filteredNotes.filter(note => 
        tags.some(tag => note.tags.includes(tag))
      )
    }
    
    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNotes = filteredNotes.slice(startIndex, endIndex)
    
    return [200, {
      notes: paginatedNotes,
      currentPage: page,
      totalPages: Math.ceil(filteredNotes.length / limit),
      totalNotes: filteredNotes.length,
      limit
    }]
  })

  // Get AI-suggested tags
  mock.onPost('/notes/suggest-tags').reply((config) => {
    const { content } = JSON.parse(config.data)
    
    // This is a very basic mock for tag suggestions
    // In a real app, this would use an AI service
    const possibleTags = ['work', 'personal', 'idea', 'todo', 'meeting', 'project', 'learning', 'travel', 'recipe', 'health']
    
    // Generate 2 "suggested" tags based on content
    let suggestedTags = []
    
    if (content.toLowerCase().includes('meeting')) {
      suggestedTags.push('meeting')
    }
    
    if (content.toLowerCase().includes('todo') || content.toLowerCase().includes('task')) {
      suggestedTags.push('todo')
    }
    
    if (content.toLowerCase().includes('idea') || content.toLowerCase().includes('concept')) {
      suggestedTags.push('idea')
    }
    
    if (content.toLowerCase().includes('travel') || content.toLowerCase().includes('trip')) {
      suggestedTags.push('travel')
    }
    
    if (content.toLowerCase().includes('recipe') || content.toLowerCase().includes('cook')) {
      suggestedTags.push('recipe')
    }
    
    if (content.toLowerCase().includes('work') || content.toLowerCase().includes('job')) {
      suggestedTags.push('work')
    }
    
    if (content.toLowerCase().includes('learn') || content.toLowerCase().includes('study')) {
      suggestedTags.push('learning')
    }
    
    // If we couldn't determine tags based on content, return random ones
    if (suggestedTags.length < 2) {
      while (suggestedTags.length < 2) {
        const randomTag = possibleTags[Math.floor(Math.random() * possibleTags.length)]
        if (!suggestedTags.includes(randomTag)) {
          suggestedTags.push(randomTag)
        }
      }
    }
    
    // Limit to 2 tags
    suggestedTags = suggestedTags.slice(0, 2)
    
    return [200, { tags: suggestedTags }]
  })
}