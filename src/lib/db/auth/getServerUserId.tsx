import { createReadOnlyServerClient } from '@/supabase/clients/server'
import React from 'react'

export async function getServerUserId() {
const supabase = createReadOnlyServerClient()
const {data} = await supabase.auth.getUser()
return data?.user?.id
}
