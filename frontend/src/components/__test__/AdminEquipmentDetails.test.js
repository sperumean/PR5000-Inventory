

test('if handleClick works', () => {
    expect(() => handleClick(id).toThrow(`/admin/equipment/edit/${id}`))
})

test('if handleClick works', () => {
    expect(() => handleClick(id).toBe(`/admin/equipment/edit/${id}`))
})

test('if handleDeleteEquipmentClick returns to admin page', () => {
    expect(() => handleDeleteEquipmentClick(id).toBe("/admin"))
})