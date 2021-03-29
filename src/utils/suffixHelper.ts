export function IsImage(path: string): boolean {

    const suffix = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.raw']
    for (let i = 0; i < suffix.length; i++) {
        if (path.toLowerCase().endsWith(suffix[i]))
            return true
    }
    return false
}

export function IsVideo(path: string): boolean {

    const suffix = ['.avi', '.rmvb', '.rm', '.asf', '.divx', '.mpg', '.mpeg', '.mpe', '.wmv', '.mp4', '.mkv', '.vob']
    for (let i = 0; i < suffix.length; i++) {
        if (path.toLowerCase().endsWith(suffix[i]))
            return true
    }
    return false
}

export function GetFileType(path: string): string {
    if (IsImage(path))
        return 'image'
    if (IsVideo(path))
        return 'video'
    if (path.toLowerCase().endsWith('.txt'))
        return 'txt'
    if (path.toLowerCase().endsWith('.bin'))
        return 'bin'
    return 'unknown'
}
